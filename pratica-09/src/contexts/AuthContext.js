import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  // Desafio Extra: Lê o disco ao carregar a aplicação
  useEffect(() => {
    async function carregarSessao() {
      const usuarioSalvo = await AsyncStorage.getItem("@Auth:usuario");
      if (usuarioSalvo) {
        setUsuario(JSON.parse(usuarioSalvo));
      }
    }
    carregarSessao();
  }, []);

  async function signIn(email, senha) {
    if (!email || !senha) return alert("Preencha todos os campos!");
    
    const respostaAPI = { id: "123", nome: "Turma INF204", email: email };
    
    // Desafio Extra: Grava a sessão no disco
    await AsyncStorage.setItem("@Auth:usuario", JSON.stringify(respostaAPI));
    setUsuario(respostaAPI);
  }

  async function signOut() {
    // Apaga a sessão ao sair
    await AsyncStorage.removeItem("@Auth:usuario");
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ logado: !!usuario, usuario, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}