# INF204 - Desenvolvimento para Dispositivos Móveis

Bem-vindo ao repositório de práticas laboratoriais da disciplina INF204. 
Para garantir a organização e evitar conflitos, cada prática foi desenvolvida de forma isolada na sua respetiva *branch* e pasta. 

**⚠️ Aviso Importante de Execução (Rede da Universidade):**
Como o Wi-Fi da instituição bloqueia conexões locais do Expo Go, **todas as práticas** devem ser iniciadas utilizando a flag de túnel (`--tunnel ngrok`) e limpeza de cache (`-c`) para garantir que o aplicativo abra corretamente. 

Abaixo estão os comandos necessários para navegar e executar cada uma das entregas.

---

## 📌 Guia de Execução das Práticas

### Prática 01
```bash
git checkout feature/pratica-01 
cd pratica-01
npm install
npx expo start -c --tunnel ngrok
