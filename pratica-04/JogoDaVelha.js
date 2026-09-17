import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function JogoDaVelha() {
  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const jogar = (index) => {
    if (tabuleiro[index]) return;
    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[index] = isXNext ? "X" : "O";
    setTabuleiro(novoTabuleiro);
    setIsXNext(!isXNext);
  };

  const renderCelula = (index) => (
    <TouchableOpacity style={styles.celula} onPress={() => jogar(index)}>
      <Text style={styles.textoCelula}>{tabuleiro[index]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo da Velha</Text>
      <View style={styles.tabuleiro}>
        <View style={styles.linha}>
          {renderCelula(0)}
          {renderCelula(1)}
          {renderCelula(2)}
        </View>
        <View style={styles.linha}>
          {renderCelula(3)}
          {renderCelula(4)}
          {renderCelula(5)}
        </View>
        <View style={styles.linha}>
          {renderCelula(6)}
          {renderCelula(7)}
          {renderCelula(8)}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 50,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#14325A",
  },
  tabuleiro: {
    flexDirection: "column",
  },
  linha: {
    flexDirection: "row",
  },
  celula: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderColor: "#14325A",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  textoCelula: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#006440",
  },
});