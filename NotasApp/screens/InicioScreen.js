// screens/InicioScreen.js
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Easing,
} from 'react-native';

const InicioScreen = ({ navigation }) => {
  const colorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnim, {
          toValue: 1,
          duration: 5000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(colorAnim, {
          toValue: 0,
          duration: 5000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#d7f0ff', '#b0e0ff'], // Azul celeste claro a azul suave
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      {/* Logo  */}
      <Image
        
      />

      <Text style={styles.titulo}>Bienvenido a Notas</Text>
      <Text style={styles.subtitulo}>Organiza tus ideas de forma rápida y simple</Text>

      <TouchableOpacity
        style={[styles.boton, styles.botonLogin]}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.textoBoton}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.boton, styles.botonRegistro]}
        onPress={() => navigation.navigate('Registro')}
      >
        <Text style={styles.textoBoton}>Registrarse</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default InicioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  boton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  botonLogin: {
    backgroundColor: '#007AFF',
  },
  botonRegistro: {
    backgroundColor: '#34C759',
  },
  textoBoton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
