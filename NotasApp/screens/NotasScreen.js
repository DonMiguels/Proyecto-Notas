import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

export default function NotasScreen({ route }) {
  const { usuario_id } = route.params;  // Recibe el ID del usuario desde la navegación
  const IP_LOCAL = '192.168.1.149'; 
  const BASE_URL = `http://${IP_LOCAL}:3000/api/notas`;

  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [notaActual, setNotaActual] = useState(null);

  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');

  // Cargar notas del usuario
  const fetchNotas = async () => {
    setLoading(true);
    try {
      // Cambié la URL para que sea `/${usuario_id}`, que coincide con la ruta backend
      const response = await axios.get(`${BASE_URL}/${usuario_id}`);
      setNotas(response.data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las notas');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotas();
  }, [usuario_id]);

  const abrirModalNuevaNota = () => {
    setNotaActual(null);
    setTitulo('');
    setContenido('');
    setModalVisible(true);
  };

  const abrirModalEditar = (nota) => {
    setNotaActual(nota);
    setTitulo(nota.titulo);
    setContenido(nota.contenido);
    setModalVisible(true);
  };

  const guardarNota = async () => {
    if (!titulo.trim() || !contenido.trim()) {
      Alert.alert('Error', 'Título y contenido son requeridos');
      return;
    }

    try {
      if (notaActual) {
        // Actualizar nota
        await axios.put(`${BASE_URL}/${notaActual.id}`, { titulo, contenido });
        setNotas((prev) =>
          prev.map((n) =>
            n.id === notaActual.id ? { ...n, titulo, contenido } : n
          )
        );
      } else {
        // Crear nueva nota
        const response = await axios.post(BASE_URL, {
          usuario_id,
          titulo,
          contenido,
        });
        setNotas((prev) => [response.data, ...prev]);
      }
      setModalVisible(false);
      setTitulo('');
      setContenido('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la nota');
    }
  };

  const eliminarNota = (id) => {
    Alert.alert('Eliminar nota', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        onPress: async () => {
          try {
            await axios.delete(`${BASE_URL}/${id}`);
            setNotas((prev) => prev.filter((n) => n.id !== id));
          } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar la nota');
          }
        },
        style: 'destructive',
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.nota}>
      <Text style={styles.tituloNota}>{item.titulo}</Text>
      <Text style={styles.contenidoNota}>{item.contenido}</Text>
      <View style={styles.botones}>
        <TouchableOpacity
          style={[styles.botonAccion, { backgroundColor: '#FF9500' }]}
          onPress={() => abrirModalEditar(item)}
        >
          <Text style={styles.textoBotonAccion}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botonAccion, { backgroundColor: '#FF3B30' }]}
          onPress={() => eliminarNota(item.id)}
        >
          <Text style={styles.textoBotonAccion}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.encabezado}>Mis Notas</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={notas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.lista}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>
              No hay notas disponibles
            </Text>
          }
        />
      )}

      <TouchableOpacity style={styles.botonAgregar} onPress={abrirModalNuevaNota}>
        <Text style={styles.botonTexto}>＋ Nueva Nota</Text>
      </TouchableOpacity>

      {/* Modal para crear/editar nota */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContenido}>
            <Text style={styles.modalTitulo}>{notaActual ? 'Editar Nota' : 'Nueva Nota'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={titulo}
              onChangeText={setTitulo}
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Contenido"
              value={contenido}
              onChangeText={setContenido}
              multiline
            />
            <TouchableOpacity style={styles.botonGuardar} onPress={guardarNota}>
              <Text style={styles.botonTexto}>{notaActual ? 'Actualizar' : 'Guardar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.botonCancelar}
            >
              <Text style={{ color: '#666' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F8', paddingHorizontal: 20, paddingTop: 40 },
  encabezado: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' },
  lista: { paddingBottom: 100 },
  nota: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
  },
  tituloNota: { fontSize: 18, fontWeight: '600', marginBottom: 5 },
  contenidoNota: { fontSize: 15, color: '#555' },
  botones: { flexDirection: 'row', marginTop: 10, justifyContent: 'flex-end' },
  botonAccion: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, marginLeft: 10 },
  textoBotonAccion: { color: '#fff', fontWeight: 'bold' },
  botonAgregar: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5,
  },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 20,
  },
  modalContenido: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  botonGuardar: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonCancelar: {
    marginTop: 10,
    alignItems: 'center',
  },
});
