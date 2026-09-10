import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

export default function App() {
  const [mesario, setMesario] = useState("");
  const [votosSilva, setVotosSilva] = useState(0);
  const [votosSantos, setVotosSantos] = useState(0);
  const [votosOliveira, setVotosOliveira] = useState(0);

  const totalVotos = votosSilva + votosSantos + votosOliveira;

  const calcPorcentagem = (votos) => {
    return totalVotos > 0 ? ((votos / totalVotos) * 100).toFixed(1) : "0.0";
  };

  const zerarUrna = () => {
    setVotosSilva(0);
    setVotosSantos(0);
    setVotosOliveira(0);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Urna Eletrônica</Text>
      </View>

      <View style={styles.cardMesario}>
        <TextInput
          style={styles.inputMesario}
          placeholder="Digite o nome do mesário..."
          placeholderTextColor="#999"
          value={mesario}
          onChangeText={setMesario}
        />
        <Text style={styles.textoMesario}>
          Mesário: {mesario || "Aguardando identificação..."}
        </Text>
      </View>

      <View style={styles.candidatoContainer}>
        <View style={styles.infoCandidato}>
          <Text style={styles.nomeCandidato}>Silva</Text>
          <Text style={styles.partidoCandidato}>Partido 12</Text>
        </View>
        <View style={styles.votosContainer}>
          <Text style={styles.textoVotos}>
            {votosSilva} votos ({calcPorcentagem(votosSilva)}%)
          </Text>
          <TouchableOpacity
            style={[styles.botaoVotar, { backgroundColor: "#E63946" }]}
            onPress={() => setVotosSilva((prev) => prev + 1)}
          >
            <Text style={styles.textoBotao}>Votar 12</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.candidatoContainer}>
        <View style={styles.infoCandidato}>
          <Text style={styles.nomeCandidato}>Santos</Text>
          <Text style={styles.partidoCandidato}>Partido 45</Text>
        </View>
        <View style={styles.votosContainer}>
          <Text style={styles.textoVotos}>
            {votosSantos} votos ({calcPorcentagem(votosSantos)}%)
          </Text>
          <TouchableOpacity
            style={[styles.botaoVotar, { backgroundColor: "#457B9D" }]}
            onPress={() => setVotosSantos((prev) => prev + 1)}
          >
            <Text style={styles.textoBotao}>Votar 45</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.candidatoContainer}>
        <View style={styles.infoCandidato}>
          <Text style={styles.nomeCandidato}>Oliveira</Text>
          <Text style={styles.partidoCandidato}>Partido 77</Text>
        </View>
        <View style={styles.votosContainer}>
          <Text style={styles.textoVotos}>
            {votosOliveira} votos ({calcPorcentagem(votosOliveira)}%)
          </Text>
          <TouchableOpacity
            style={[styles.botaoVotar, { backgroundColor: "#2A9D8F" }]}
            onPress={() => setVotosOliveira((prev) => prev + 1)}
          >
            <Text style={styles.textoBotao}>Votar 77</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rodape}>
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Total de Votos</Text>
          <Text style={styles.totalNumero}>{totalVotos}</Text>
        </View>
        <TouchableOpacity style={styles.botaoZerar} onPress={zerarUrna}>
          <Text style={styles.textoBotaoZerar}>Zerar Urna</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#E0E5EC",
    padding: 20,
    paddingBottom: 40,
  },
  header: { alignItems: "center", marginBottom: 20, marginTop: 20 },
  titulo: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1D3557",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  cardMesario: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputMesario: {
    backgroundColor: "#F1FAEE",
    borderWidth: 1,
    borderColor: "#A8DADC",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1D3557",
    marginBottom: 10,
  },
  textoMesario: {
    fontSize: 14,
    color: "#457B9D",
    fontWeight: "600",
    fontStyle: "italic",
    textAlign: "center",
  },
  candidatoContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 6,
    borderLeftColor: "#1D3557",
  },
  infoCandidato: { flex: 1 },
  nomeCandidato: { fontSize: 18, fontWeight: "bold", color: "#1D3557" },
  partidoCandidato: { fontSize: 14, color: "#6C757D", marginTop: 4 },
  votosContainer: { alignItems: "flex-end" },
  textoVotos: {
    fontSize: 14,
    fontWeight: "600",
    color: "#457B9D",
    marginBottom: 8,
  },
  botaoVotar: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  textoBotao: { color: "#FFF", fontWeight: "bold", fontSize: 14 },
  rodape: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1D3557",
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  totalBox: { flex: 1 },
  totalLabel: {
    color: "#A8DADC",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  totalNumero: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 4,
  },
  botaoZerar: {
    backgroundColor: "#E63946",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoBotaoZerar: { color: "#FFF", fontWeight: "bold", fontSize: 14 },
});
