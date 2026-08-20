import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import ItemTarefa from "./ItemTarefa";

export default function App() {
  const [tarefas, setTarefas] = useState([
    { id: 1, descricao: "Estudar ES6+", concluida: true },
    { id: 2, descricao: "Configurar ambiente Expo", concluida: true },
    { id: 3, descricao: "Entender o funcionamento do JSX", concluida: false },
    { id: 4, descricao: "Finalizar Roteiro", concluida: false },
  ]);

  const pendentes = tarefas.filter(t => !t.concluida);

  const adicionar = () => {
    setTarefas([
      ...tarefas,
      { id: Date.now(), descricao: "Nova Tarefa do Desafio", concluida: false }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Todas as Tarefas</Text>
      {tarefas.map(t => <ItemTarefa key={t.id} tarefa={t} />)}

      <Text style={styles.titulo}>Faltam Fazer</Text>
      {pendentes.map(t => <ItemTarefa key={t.id} tarefa={t} />)}

      <TouchableOpacity style={styles.botao} onPress={adicionar}>
        <Text style={styles.textoBotao}>+ Adicionar Tarefa</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1c2833",
    marginTop: 15,
    marginBottom: 15,
  },
  botao: {
    backgroundColor: "#1c2833",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});