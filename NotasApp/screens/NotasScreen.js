import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Animated,
} from 'react-native';

export default function NotasScreen() {
  // TODO: Cambiar por usuario real (ejemplo fijo aquí)
  const usuarioId = 1;

  const [notas, setNotas] = useState([]);
  const [modalCrearVisible, setModalCrearVisible] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [notaActual, setNotaActual] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Cargar notas desde backend
  useEffect(() => {
    fetchNotas();
  }, []);

  const fetchNotas = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/notas/usuario/${usuarioId}`);
      const data = await response.json();
      setNotas(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las notas');
    }
  };

  const abrirModalNuevaNota = () => {
    setNotaActual(null);
    setTitulo('');
    setContenido('');
    setModalCrearVisible(true);
  };

  const abrirModalEditar = (nota) => {
    setNotaActual(nota);
    setTitulo(nota.titulo);
    setContenido(nota.contenido);
    setModalEditarVisible(true);
  };

  const guardarNota = async () => {
    if (!titulo || !contenido) {
      Alert.alert('Error', 'Título y contenido requeridos');
      return;
    }

    if (notaActual) {
      // Editar nota
      try {
        const response = await fetch(`http://localhost:3000/api/notas/${notaActual.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ titulo, contenido }),
        });
        if (!response.ok) throw new Error('Error al actualizar');

        setNotas((prev) =>
          prev.map((n) =>
            n.id === notaActual.id ? { ...n, titulo, contenido } : n
          )
        );
        setModalEditarVisible(false);
      } catch (error) {
        Alert.alert('Error', 'No se pudo actualizar la nota');
      }
    } else {
      // Crear nota
      try {
        const response = await fetch(`http://localhost:3000/api/notas`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usuario_id: usuarioId, titulo, contenido }),
        });
        if (!response.ok) throw new Error('Error al crear');

        const nuevaNota = await response.json();
        setNotas((prev) => [nuevaNota, ...prev]);
        setModalCrearVisible(false);
      } catch (error) {
        Alert.alert('Error', 'No se pudo crear la nota');
      }
    }

    setTitulo('');
    setContenido('');
  };

  const eliminarNota = (id) => {
    Alert.alert('Eliminar nota', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        onPress: async () => {
          try {
            const response = await fetch(`http://localhost:3000/api/notas/${id}`, {
              method: 'DELETE',
            });
            if (!response.ok) throw new Error('Error al eliminar');

            setNotas((prev) => prev.filter((n) => n.id !== id));
          } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar la nota');
          }
        },
        style: 'destructive',
      },
    ]);
  };

  useEffect(() => {
    if (modalEditarVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [modalEditarVisible]);

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
      <Text style={styles.encabezado}> Mis Notas</Text>

      <FlatList
        data={notas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.lista}
      />

      <TouchableOpacity style={styles.botonAgregar} onPress={abrirModalNuevaNota}>
        <Text style={styles.botonTexto}>＋ Nueva Nota</Text>
      </TouchableOpacity>

      {/* Modal para crear nueva nota */}
      <Modal visible={modalCrearVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContenido}>
            <Text style={styles.modalTitulo}>Nueva Nota</Text>
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
              <Text style={styles.botonTexto}>Guardar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalCrearVisible(false)}
              style={styles.botonCancelar}
            >
              <Text style={{ color: '#666' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal animado para editar nota */}
      <Modal visible={modalEditarVisible} transparent>
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
          <View style={styles.modalContenido}>
            <Text style={styles.modalTitulo}>Editar Nota</Text>
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
              <Text style={styles.botonTexto}>Actualizar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalEditarVisible(false)}
              style={styles.botonCancelar}
            >
              <Text style={{ color: '#666' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F8',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  encabezado: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  lista: {
    paddingBottom: 100,
  },
  nota: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
  },
  tituloNota: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  contenidoNota: {
    fontSize: 15,
    color: '#555',
  },
  botones: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  botonAccion: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  textoBotonAccion: {
    color: '#fff',
    fontWeight: 'bold',
  },
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
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
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
