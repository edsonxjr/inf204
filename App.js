import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const BotaoCustomizado = ({ titulo, onPress, corFundo }) => (
  <TouchableOpacity style={[styles.botao, { backgroundColor: corFundo }]} onPress={onPress}>
    <Text style={styles.textoBotao}>{titulo}</Text>
  </TouchableOpacity>
);

export default function App() {
  const [contagem, setContagem] = useState(0);

  const incrementar = () => setContagem(contagem + 1);
  const decrementar = () => setContagem(contagem > 0 ? contagem - 1 : 0);
  const zerar = () => setContagem(0);

  const botoes = [
    { id: 1, titulo: "Incrementar +1", acao: incrementar, cor: "#2196f3" },
    { id: 2, titulo: "Decrementar -1", acao: decrementar, cor: "#2196f3" },
    { id: 3, titulo: "Zerar", acao: zerar, cor: "#f44336" }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contagem Atual:</Text>
      
      <Text style={[styles.numero, contagem === 0 ? styles.corZerado : styles.corAtivo]}>
        {contagem}
      </Text>

      {botoes.map(({ id, titulo, acao, cor }) => (
        <BotaoCustomizado
          key={id}
          titulo={titulo}
          onPress={acao}
          corFundo={cor}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  titulo: {
    fontSize: 20,
    color: "#333333"
  },
  numero: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 20
  },
  corZerado: {
    color: "#9e9e9e"
  },
  corAtivo: {
    color: "#4caf50"
  },
  botao: {
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    width: 200,
    alignItems: "center"
  },
  textoBotao: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold"
  }
});