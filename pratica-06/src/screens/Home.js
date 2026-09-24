import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Olá, Turma INF204 👋</Text>
        <Text style={styles.subtitulo}>Bem-vindo ao app de navegação</Text>
      </View>

      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate("Detalhes", { nomeUsuario: "Turma INF204" })}
        activeOpacity={0.7}
      >
        <View style={styles.cardIcon}>
          <Ionicons name="person" size={24} color="#FFF" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Meu Perfil</Text>
          <Text style={styles.cardSubtitle}>Toque para ver os detalhes</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#CBD5E0" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6F9", padding: 20 },
  header: { marginTop: 40, marginBottom: 30 },
  titulo: { fontSize: 28, fontWeight: "bold", color: "#14325A" },
  subtitulo: { fontSize: 16, color: "#718096", marginTop: 5 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#14325A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15
  },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#2D3748" },
  cardSubtitle: { fontSize: 14, color: "#A0AEC0", marginTop: 2 }
});