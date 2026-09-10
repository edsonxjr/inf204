import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import JogoDaVelha from "./JogoDaVelha";

export default function App() {
  const [nome, setNome] = useState("Vinícius Júnior");
  const [seguindo, setSeguindo] = useState(false);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        
        <View style={styles.cartao}>
          <Image source={require("./assets/vini.jpg")} style={styles.avatar} />
          <Text style={styles.nomeUsuario}>{nome}</Text>
          <Text style={styles.profissao}>Ponta Esquerda</Text>
          <TouchableOpacity style={styles.botao} activeOpacity={0.7} onPress={() => alert("Seguindo " + nome)}>
            <Text style={styles.textoBotao}>Seguir</Text>
          </TouchableOpacity>
          <TextInput style={styles.input} placeholder="Alterar nome..." value={nome} onChangeText={setNome} />
        </View>

        <View style={styles.cartao}>
          <Image source={require("./assets/kevin.jpg")} style={styles.avatar} />
          <Text style={styles.nomeUsuario}>Kevin De Bruyne</Text>
          <Text style={styles.profissao}>Meio-Campista</Text>
          <TouchableOpacity 
            style={[styles.botao, seguindo && styles.botaoDesativado]} 
            activeOpacity={0.7} 
            onPress={() => setSeguindo(!seguindo)}
          >
            <Text style={styles.textoBotao}>{seguindo ? "Já Seguindo" : "Seguir"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cartao}>
          <Image source={require("./assets/virgil.jpg")} style={styles.avatar} />
          <Text style={styles.nomeUsuario}>Virgil van Dijk</Text>
          <Text style={styles.profissao}>Zagueiro</Text>
          <TouchableOpacity style={styles.botao} activeOpacity={0.7}>
            <Text style={styles.textoBotao}>Seguir</Text>
          </TouchableOpacity>
        </View>

        <JogoDaVelha />
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  cartao: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: "80%",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  nomeUsuario: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#14325A",
  },
  profissao: {
    fontSize: 16,
    color: "#505050",
    marginBottom: 20,
  },
  botao: {
    backgroundColor: "#006440",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  botaoDesativado: {
    backgroundColor: "#808080",
  },
  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    textAlign: "center",
  },
});