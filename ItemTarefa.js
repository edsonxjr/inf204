import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ItemTarefa({ tarefa }) {
  return (
    <View style={styles.card}>
      {tarefa.concluida ? (
        <Text style={styles.textoConcluido}>
          ✓ {tarefa.descricao}
        </Text>
      ) : (
        <Text style={styles.textoPendente}>
          ○ {tarefa.descricao}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textoPendente: {
    fontSize: 16,
    color: "#d9534f",
    fontWeight: "bold",
  },
  textoConcluido: {
    fontSize: 16,
    color: "#4caf50",
    textDecorationLine: "line-through",
  },
});