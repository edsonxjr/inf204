import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TextInput, Button, Alert } from "react-native";
import api from "./src/services/api";

interface Utilizador {
  id: number;
  name: string;
  email: string;
}

export default function App() {
  const [utilizadores, setUtilizadores] = useState<Utilizador[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [ecraAtual, setEcraAtual] = useState<"lista" | "formulario">("lista");

  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const buscarDados = async () => {
    try {
      const resposta = await api.get<Utilizador[]>("/users");
      setUtilizadores(resposta.data);
    } catch (erro: any) {
      console.error("Erro ao buscar dados:", erro.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    buscarDados();
  }, []);

  const aoAtualizar = () => {
    setRefreshing(true);
    buscarDados();
  };

  const submeterFormulario = async () => {
    if (!nome || !email) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }
    try {
      const resposta = await api.post<Utilizador>("/users", { name: nome, email });
      Alert.alert("Sucesso", `Utilizador ${resposta.data.name} criado!`);
      setNome("");
      setEmail("");
      setEcraAtual("lista");
    } catch (erro) {
      Alert.alert("Erro", "Falha ao criar utilizador.");
    }
  };

  if (loading) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>A carregar utilizadores...</Text>
      </View>
    );
  }

  if (ecraAtual === "formulario") {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Novo Utilizador</Text>
        <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <View style={styles.botoes}>
          <Button title="Salvar" onPress={submeterFormulario} />
          <Button title="Cancelar" color="red" onPress={() => setEcraAtual("lista")} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Utilizadores (TypeScript)</Text>
      <Button title="Adicionar Utilizador" onPress={() => setEcraAtual("formulario")} />
      <FlatList
        data={utilizadores}
        keyExtractor={(item, index) => item?.id ? item.id.toString() : index.toString()}
        refreshing={refreshing}
        onRefresh={aoAtualizar}
        renderItem={({ item }) => (
          <View style={styles.cartao}>
            <Text style={styles.nome}>{item?.name}</Text>
            <Text style={styles.email}>{item?.email}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", paddingTop: 50, paddingHorizontal: 20 },
  centro: { flex: 1, justifyContent: "center", alignItems: "center" },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#14325A" },
  cartao: { backgroundColor: "#FFF", padding: 15, marginBottom: 10, borderRadius: 8, elevation: 2, marginTop: 10 },
  nome: { fontSize: 18, fontWeight: "bold" },
  email: { color: "#666", marginTop: 5 },
  input: { backgroundColor: "#FFF", padding: 10, marginBottom: 15, borderRadius: 5, borderWidth: 1, borderColor: "#DDD" },
  botoes: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 }
});