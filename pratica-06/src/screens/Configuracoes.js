import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Configuracoes() {
  const [notificacoes, setNotificacoes] = useState(true);
  const [temaEscuro, setTemaEscuro] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ajustes</Text>
      
      <View style={styles.section}>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <Ionicons name="notifications" size={20} color="#14325A" />
          </View>
          <Text style={styles.rowText}>Notificações</Text>
          <Switch 
            value={notificacoes} 
            onValueChange={setNotificacoes} 
            trackColor={{ false: "#CBD5E0", true: "#14325A" }}
          />
        </View>

        <View style={[styles.row, { borderBottomWidth: 0 }]}>
          <View style={styles.iconContainer}>
            <Ionicons name="moon" size={20} color="#14325A" />
          </View>
          <Text style={styles.rowText}>Modo Escuro</Text>
          <Switch 
            value={temaEscuro} 
            onValueChange={setTemaEscuro}
            trackColor={{ false: "#CBD5E0", true: "#14325A" }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6F9", padding: 20 },
  titulo: { fontSize: 28, fontWeight: "bold", color: "#14325A", marginTop: 40, marginBottom: 20 },
  section: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F4F6F9"
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15
  },
  rowText: { flex: 1, fontSize: 16, color: "#2D3748", fontWeight: "500" }
});