import React from "react";
import { AuthProvider } from "./src/contexts/AuthContext";
import { TemaProvider } from "./src/contexts/TemaContext";
import Rotas from "./src/routes";

export default function App() {
  return (
    // Aninhamento de Providers: A aplicação agora herda Tema e Autenticação
    <TemaProvider>
      <AuthProvider>
        <Rotas />
      </AuthProvider>
    </TemaProvider>
  );
}