import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const manejarLogin = () => {
    if (!usuario || !contrasena) {
      Alert.alert('Error', 'Por favor ingresa usuario y contraseña');
      return;
    }

    // Muestra el mensaje y navega después
    Alert.alert('Éxito', `Usuario ${usuario} ha iniciado sesión`, [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Notas') // ✅ Redirige a la pantalla Notas
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario o Email"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
      />
      <Button title="Iniciar Sesión" onPress={manejarLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
