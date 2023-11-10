import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const FreteScreen = ({ route }) => {
  const [distancia, setDistancia] = useState('');
  const [frete, setFrete] = useState('');

  const calcularFrete = () => {
    const distanciaFloat = parseFloat(distancia);

    if (!isNaN(distanciaFloat)) {
      const valorFrete = distanciaFloat * 1; 
      setFrete(valorFrete.toFixed(2)); 
    } else {
      setFrete('Distância inválida');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Distância (em km) do Shopping Dom Pedro:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a distância"
        keyboardType="numeric"
        value={distancia}
        onChangeText={(text) => setDistancia(text)}
      />
      <Button title="Calcular Frete" onPress={calcularFrete} />
      <Text style={styles.resultado}>Valor do Frete: {frete}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  resultado: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default FreteScreen;
