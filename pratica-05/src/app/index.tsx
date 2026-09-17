import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";

const contatosIniciais = [
  { id: "1", nome: "Alice Silva", telefone: "(31) 99999-1111" },
  { id: "2", nome: "Bruno Costa", telefone: "(31) 98888-2222" },
  { id: "3", nome: "Carlos Souza", telefone: "(31) 97777-3333" },
  { id: "4", nome: "Diana Rocha", telefone: "(31) 96666-4444" },
  { id: "5", nome: "Eduardo Lima", telefone: "(31) 95555-5555" },
  { id: "6", nome: "Fernanda Alves", telefone: "(31) 94444-6666" },
  { id: "7", nome: "Gabriel Mendes", telefone: "(31) 93333-7777" },
  { id: "8", nome: "Helena Castro", telefone: "(31) 92222-8888" },
  { id: "9", nome: "Igor Martins", telefone: "(31) 91111-9999" },
  { id: "10", nome: "Julia Santos", telefone: "(31) 90000-0000" },
  { id: "11", nome: "Kayo Salgado", telefone: "(31) 98888-1111" },
  { id: "12", nome: "Matheus Zinato", telefone: "(31) 97777-2222" },
  { id: "13", nome: "Bernardo Cordeiro", telefone: "(31) 96666-3333" },
  { id: "14", nome: "Edson Junior", telefone: "(31) 95555-4444" },
  { id: "15", nome: "Maga IA", telefone: "(00) 00000-0000" }
];

export default function Agenda() {
  const [contatos, setContatos] = useState(contatosIniciais);
  const [carregando, setCarregando] = useState(false);

  const recarregarLista = () => {
    setCarregando(true);
    setTimeout(() => {
      setContatos(contatosIniciais);
      setCarregando(false);
    }, 2000);
  };

  const carregarMais = () => {
    const novosContatos = [
      { id: Math.random().toString(), nome: "Novo Contato A", telefone: "(00) 11111-1111" },
      { id: Math.random().toString(), nome: "Novo Contato B", telefone: "(00) 22222-2222" },
      { id: Math.random().toString(), nome: "Novo Contato C", telefone: "(00) 33333-3333" }
    ];
    setContatos(prev => [...prev, ...novosContatos]);
  };

  const renderizarContato = ({ item }) => {
    // Pega a primeira letra do nome para fazer o Avatar
    const inicial = item.nome.charAt(0).toUpperCase();
    
    return (
      <View style={styles.cardContato}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{inicial}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.nomeText}>{item.nome}</Text>
          <Text style={styles.telefoneText}>{item.telefone}</Text>
        </View>
      </View>
    );
  };

  const renderizarVazio = () => (
    <View style={styles.containerVazio}>
      <Text style={styles.textoVazio}>📭 Agenda Vazia</Text>
      <Text style={styles.subtextoVazio}>Puxe para baixo para recarregar</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.titulo}>Contatos</Text>
          <Text style={styles.subtitulo}>{contatos.length} salvos</Text>
        </View>
        <TouchableOpacity style={styles.botaoLimpar} onPress={() => setContatos([])}>
          <Text style={styles.textoBotao}>Limpar</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id}
        renderItem={renderizarContato}
        contentContainerStyle={styles.listaContainer}
        ListEmptyComponent={renderizarVazio}
        refreshing={carregando}
        onRefresh={recarregarLista}
        onEndReached={carregarMais}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F4F6F9" 
  },
  cabecalho: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    backgroundColor: "#14325A",
    paddingHorizontal: 20, 
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20
  },
  titulo: { 
    fontSize: 28, 
    fontWeight: "bold", 
    color: "#FFF" 
  },
  subtitulo: {
    fontSize: 14,
    color: "#B0C4DE",
    marginTop: 2
  },
  botaoLimpar: { 
    backgroundColor: "#FF4757", 
    paddingVertical: 8, 
    paddingHorizontal: 16, 
    borderRadius: 20 
  },
  textoBotao: { 
    color: "#FFF", 
    fontWeight: "bold",
    fontSize: 14
  },
  listaContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20
  },
  cardContato: { 
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF", 
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#14325A"
  },
  info: {
    flex: 1
  },
  nomeText: { 
    fontSize: 17, 
    fontWeight: "bold", 
    color: "#2D3748" 
  },
  telefoneText: { 
    fontSize: 14, 
    color: "#718096", 
    marginTop: 4 
  },
  containerVazio: { 
    alignItems: "center", 
    marginTop: 80 
  },
  textoVazio: { 
    fontSize: 20, 
    fontWeight: "bold",
    color: "#A0AEC0",
    marginBottom: 5
  },
  subtextoVazio: {
    fontSize: 14,
    color: "#CBD5E0"
  }
});