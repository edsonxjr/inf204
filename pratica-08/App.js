import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { MaterialIcons } from "@expo/vector-icons";

// Inicializa o banco de dados
const iniciarBanco = async (db) => {
  await db.execAsync("PRAGMA journal_mode = WAL;");
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      concluida INTEGER DEFAULT 0
    );
  `);
};

function EcraPrincipal() {
  const db = useSQLiteContext();

  const [usuario, setUsuario] = useState({ nome: "Visitante", logado: true });
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  useEffect(() => {
    carregarPreferencias();
    carregarTarefas();
  }, []);

  const carregarPreferencias = async () => {
    const dadosSalvos = await AsyncStorage.getItem("@AppTarefas:Usuario");
    if (dadosSalvos) {
      setUsuario(JSON.parse(dadosSalvos));
    }
  };

  const salvarNome = async () => {
    const novoUsuario = { nome: "Estudante INF204", logado: true };
    await AsyncStorage.setItem("@AppTarefas:Usuario", JSON.stringify(novoUsuario));
    setUsuario(novoUsuario);
  };

  const carregarTarefas = async () => {
    try {
      const resultados = await db.getAllAsync("SELECT * FROM tarefas ORDER BY id DESC;");
      setTarefas(resultados);
    } catch (erro) {
      console.error("Falha ao ler dados", erro);
    }
  };

  const adicionarTarefa = async () => {
    if (novaTarefa.trim() === "") return;
    try {
      await db.runAsync("INSERT INTO tarefas (descricao, concluida) VALUES (?, ?);", [novaTarefa, 0]);
      setNovaTarefa("");
      carregarTarefas(); 
    } catch (erro) {
      console.error("Erro no insert", erro);
    }
  };

  const alternarStatus = async (id, statusAtual) => {
    const novoStatus = statusAtual === 1 ? 0 : 1;
    await db.runAsync("UPDATE tarefas SET concluida = ? WHERE id = ?;", [novoStatus, id]);
    carregarTarefas();
  };

  const apagarTarefa = async (id) => {
    await db.runAsync("DELETE FROM tarefas WHERE id = ?;", [id]);
    carregarTarefas();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F7FC" />
      
      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.saudacao}>Bom dia,</Text>
          <Text style={styles.titulo}>{usuario.nome}!</Text>
        </View>
        <TouchableOpacity style={styles.botaoAcao} onPress={salvarNome}>
          <MaterialIcons name="edit" size={20} color="#4F46E5" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="O que precisa de ser feito?"
          placeholderTextColor="#94A3B8"
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />
        <TouchableOpacity style={styles.botaoAdd} onPress={adicionarTarefa}>
          <MaterialIcons name="add" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listaContainer}
        renderItem={({ item }) => (
          <View style={styles.cartao}>
            <TouchableOpacity 
              style={styles.areaTextoTarefa} 
              onPress={() => alternarStatus(item.id, item.concluida)}
            >
              <MaterialIcons 
                name={item.concluida === 1 ? "check-circle" : "radio-button-unchecked"} 
                size={26} 
                color={item.concluida === 1 ? "#10B981" : "#CBD5E1"} 
              />
              <Text style={[styles.textoTarefa, item.concluida === 1 && styles.textoConcluido]}>
                {item.descricao}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.botaoApagar} onPress={() => apagarTarefa(item.id)}>
              <MaterialIcons name="delete-outline" size={24} color="#EF4444" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

export default function App() {
  return (
    <SQLiteProvider databaseName="app-database.db" onInit={iniciarBanco}>
      <EcraPrincipal />
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F4F7FC", 
    paddingTop: 60, 
    paddingHorizontal: 24 
  },
  cabecalho: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 30 
  },
  saudacao: { 
    fontSize: 16, 
    color: "#64748B",
    marginBottom: 4
  },
  titulo: { 
    fontSize: 28, 
    fontWeight: "800", 
    color: "#0F172A" 
  },
  botaoAcao: { 
    backgroundColor: "#E0E7FF", 
    padding: 12, 
    borderRadius: 12 
  },
  inputContainer: { 
    flexDirection: "row", 
    marginBottom: 24,
    alignItems: "center"
  },
  input: { 
    flex: 1, 
    backgroundColor: "#FFF",
    borderWidth: 1, 
    borderColor: "#E2E8F0", 
    borderRadius: 16, 
    padding: 16, 
    fontSize: 16,
    color: "#334155",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  botaoAdd: { 
    backgroundColor: "#4F46E5", 
    width: 56,
    height: 56,
    borderRadius: 16, 
    marginLeft: 12, 
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  listaContainer: {
    paddingBottom: 40
  },
  cartao: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#FFF", 
    padding: 16, 
    marginBottom: 12, 
    borderRadius: 16, 
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  areaTextoTarefa: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  textoTarefa: { 
    fontSize: 16, 
    color: "#334155",
    marginLeft: 12,
    fontWeight: "500",
    flexShrink: 1
  },
  textoConcluido: { 
    textDecorationLine: "line-through", 
    color: "#94A3B8",
    fontWeight: "400"
  },
  botaoApagar: { 
    padding: 8,
    marginLeft: 8
  }
});