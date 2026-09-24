import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DetalhesUsuario({ route, navigation }) {
  const { nomeUsuario } = route.params;
  // Pega a primeira letra do nome passado via rota para criar o Avatar
  const inicial = nomeUsuario.charAt(0).toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{inicial}</Text>
        </View>
        <Text style={styles.nome}>{nomeUsuario}</Text>
        <Text style={styles.email}>aluno@univicosa.com.br</Text>
        
        <View style={styles.divider} />
        
        <View style={styles.infoRow}>
          <Ionicons name="school-outline" size={20} color="#718096" />
          <Text style={styles.infoText}>INF204 - Dispositivos Móveis</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={20} color="#FFF" style={{ marginRight: 8 }} />
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6F9", padding: 20, justifyContent: "center" },
  profileCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 30
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#14325A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15
  },
  avatarText: { fontSize: 32, fontWeight: "bold", color: "#FFF" },
  nome: { fontSize: 24, fontWeight: "bold", color: "#2D3748", textAlign: "center" },
  email: { fontSize: 14, color: "#718096", marginTop: 5 },
  divider: { width: "100%", height: 1, backgroundColor: "#E2E8F0", marginVertical: 20 },
  infoRow: { flexDirection: "row", alignItems: "center" },
  infoText: { fontSize: 16, color: "#4A5568", marginLeft: 10 },
  botaoVoltar: { 
    flexDirection: "row",
    backgroundColor: "#FF4757", 
    paddingVertical: 14, 
    paddingHorizontal: 20, 
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  textoBotao: { color: "#FFF", fontWeight: "bold", fontSize: 16 }
});