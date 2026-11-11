import React, { useState, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { TemaContext } from "../contexts/TemaContext";

const Stack = createNativeStackNavigator();

function TelaLogin() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: "bold" }}>Área Restrita</Text>
      
      <TextInput 
        placeholder="Digite o seu E-mail" 
        style={styles.input} 
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput 
        placeholder="Digite a sua Palavra-passe" 
        style={styles.input} 
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      
      <View style={{ marginTop: 10, width: "100%" }}>
        <Button title="Entrar no Sistema" onPress={() => signIn(email, senha)} />
      </View>
    </View>
  );
}

function TelaDashboard() {
  const { usuario, signOut } = useAuth();
  const { tema, alternarTema } = useContext(TemaContext); // Aceder ao segundo Contexto
  
  const isEscuro = tema === "escuro";
  const corFundo = isEscuro ? "#1E1E1E" : "#FFFFFF";
  const corTexto = isEscuro ? "#FFFFFF" : "#000000";

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: corFundo }}>
      <Text style={{ fontSize: 24, marginBottom: 10, color: corTexto }}>
        Bem-vindo, {usuario?.nome}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 30, color: corTexto }}>
        O seu E-mail: {usuario?.email}
      </Text>

      <Button 
        title={`Mudar para Tema ${isEscuro ? "Claro" : "Escuro"}`} 
        onPress={alternarTema} 
        color="#555"
      />
      
      <View style={{ marginVertical: 10 }} />
      
      <Button title="Sair da Conta" color="red" onPress={signOut} />
    </View>
  );
}

export default function Rotas() {
  const { logado } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {logado ? (
          <Stack.Screen name="Dashboard" component={TelaDashboard} />
        ) : (
          <Stack.Screen name="Login" component={TelaLogin} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#F9F9F9"
  }
});