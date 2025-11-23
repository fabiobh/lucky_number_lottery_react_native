# 🐬 Guia Completo do Flipper - Debug para React Native

## 📋 Índice
1. [O que é o Flipper?](#o-que-é-o-flipper)
2. [Instalação](#instalação)
3. [Como Usar](#como-usar)
4. [Principais Recursos](#principais-recursos)
5. [Plugins Úteis](#plugins-úteis)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 O que é o Flipper?

O **Flipper** é uma plataforma de debug desenvolvida pelo Facebook (Meta) especificamente para aplicativos mobile (iOS e Android). Ele oferece uma interface visual poderosa para:

- 🔍 Inspecionar e debugar o layout da UI
- 📡 Monitorar requisições de rede
- 💾 Visualizar e editar dados do AsyncStorage
- 📊 Analisar performance e logs
- 🐛 Debugar código JavaScript
- 🔄 Visualizar estado do Redux/Context
- 📱 Inspecionar banco de dados SQLite

---

## ✅ Instalação

### Pré-requisitos
- ✅ React Native instalado
- ✅ Xcode (para iOS)
- ✅ Android Studio (para Android)

### Passos de Instalação

#### 1. Instalar o Flipper Desktop (✅ JÁ INSTALADO)
```bash
brew install --cask flipper
```

#### 2. Instalar dependência no projeto (✅ JÁ INSTALADO)
```bash
npm install --save-dev react-native-flipper
```

#### 3. Instalar pods do iOS
```bash
cd ios && pod install && cd ..
```

---

## 🚀 Como Usar

### Passo 1: Abrir o Flipper Desktop
1. Abra o aplicativo **Flipper** que foi instalado em `/Applications/Flipper.app`
2. Ou execute no terminal:
   ```bash
   open -a Flipper
   ```

### Passo 2: Iniciar o Metro Bundler
```bash
npm start
```

### Passo 3: Executar o App
**Para iOS:**
```bash
npm run ios
```

**Para Android:**
```bash
npm run android
```

### Passo 4: Conectar ao Flipper
- O Flipper detectará automaticamente seu app em execução
- Você verá o nome do app aparecer na barra lateral esquerda
- Clique no nome do app para conectar

---

## 🛠️ Principais Recursos

### 1. 📱 Layout Inspector (Hermes Debugger)
**O que faz:** Permite inspecionar a hierarquia de componentes React Native em tempo real.

**Como usar:**
1. No Flipper, selecione o plugin **"Layout"** ou **"React DevTools"**
2. Você verá a árvore de componentes do seu app
3. Clique em qualquer componente para ver suas props e estado
4. Você pode editar valores em tempo real para testar mudanças

**Casos de uso:**
- Debugar problemas de layout
- Verificar props passadas para componentes
- Identificar componentes que estão renderizando desnecessariamente

---

### 2. 🌐 Network Inspector
**O que faz:** Monitora todas as requisições HTTP/HTTPS feitas pelo app.

**Como usar:**
1. Selecione o plugin **"Network"**
2. Faça requisições no seu app
3. Veja todas as requisições listadas com:
   - URL
   - Método (GET, POST, etc.)
   - Status Code
   - Tempo de resposta
   - Headers
   - Body (request e response)

**Casos de uso:**
- Debugar APIs que não estão funcionando
- Verificar se os headers estão corretos
- Analisar tempo de resposta das requisições
- Verificar dados enviados e recebidos

---

### 3. 💾 AsyncStorage Inspector
**O que faz:** Permite visualizar, editar e deletar dados do AsyncStorage.

**Como usar:**
1. Selecione o plugin **"Async Storage"**
2. Você verá todas as chaves armazenadas
3. Clique em uma chave para ver o valor
4. Você pode:
   - ✏️ Editar valores
   - 🗑️ Deletar chaves
   - ➕ Adicionar novas chaves

**Casos de uso:**
- Verificar se dados estão sendo salvos corretamente
- Testar o app com diferentes estados de dados
- Limpar cache durante desenvolvimento
- Debugar problemas de persistência

---

### 4. 📝 Logs
**O que faz:** Mostra todos os logs do console (console.log, console.warn, console.error).

**Como usar:**
1. Selecione o plugin **"Logs"**
2. Veja todos os logs em tempo real
3. Filtre por tipo (info, warning, error)
4. Busque por texto específico

**Casos de uso:**
- Debugar fluxo de execução
- Identificar warnings e errors
- Monitorar eventos do app

---

### 5. 🎨 React DevTools
**O que faz:** Ferramenta oficial do React para inspecionar componentes.

**Como usar:**
1. Selecione o plugin **"React DevTools"**
2. Navegue pela árvore de componentes
3. Veja props, state e hooks de cada componente
4. Edite valores em tempo real

**Casos de uso:**
- Debugar estado de componentes
- Verificar fluxo de props
- Analisar re-renders
- Testar diferentes estados

---

### 6. 📊 Performance Monitor
**O que faz:** Monitora a performance do app (FPS, uso de memória, etc.).

**Como usar:**
1. Selecione o plugin **"Performance"**
2. Veja métricas em tempo real:
   - FPS (Frames por segundo)
   - Uso de memória
   - Uso de CPU
   - Tempo de renderização

**Casos de uso:**
- Identificar gargalos de performance
- Otimizar animações
- Detectar memory leaks

---

### 7. 🗄️ Database Inspector (SQLite)
**O que faz:** Permite visualizar e editar bancos de dados SQLite.

**Como usar:**
1. Selecione o plugin **"Databases"**
2. Veja todas as tabelas
3. Execute queries SQL
4. Edite dados diretamente

**Casos de uso:**
- Debugar problemas com banco de dados
- Verificar estrutura de tabelas
- Testar queries

---

## 🔌 Plugins Úteis

### Plugins Nativos (Já incluídos)
- ✅ Layout Inspector
- ✅ Network
- ✅ Logs
- ✅ React DevTools
- ✅ AsyncStorage
- ✅ Crash Reporter
- ✅ Shared Preferences (Android)

### Plugins da Comunidade (Instalar separadamente)

#### 1. Redux DevTools
Para debugar estado do Redux:
```bash
npm install --save-dev redux-flipper
```

#### 2. Navigation Plugin
Para debugar React Navigation:
```bash
npm install --save-dev @react-navigation/devtools
```

---

## 🎯 Fluxo de Trabalho Recomendado

### Durante o Desenvolvimento:
1. **Sempre deixe o Flipper aberto** enquanto desenvolve
2. Use o **Network Inspector** para verificar APIs
3. Use o **AsyncStorage** para verificar dados persistidos
4. Use o **React DevTools** para debugar componentes
5. Monitore os **Logs** para identificar problemas rapidamente

### Para Debugar Problemas:
1. **Layout quebrado?** → Use o Layout Inspector
2. **API não funciona?** → Use o Network Inspector
3. **Dados não salvam?** → Use o AsyncStorage Inspector
4. **App lento?** → Use o Performance Monitor
5. **Componente com bug?** → Use o React DevTools

---

## 🐛 Troubleshooting

### Problema: Flipper não detecta o app

**Solução 1:** Reinicie o Metro Bundler
```bash
# Pare o Metro (Ctrl+C) e execute:
npm start -- --reset-cache
```

**Solução 2:** Limpe o cache do iOS
```bash
cd ios && pod install && cd ..
npm run ios
```

**Solução 3:** Verifique se o Flipper está rodando
```bash
open -a Flipper
```

---

### Problema: Plugin não aparece

**Solução:** Habilite o plugin manualmente
1. Clique em **"Setup Doctor"** no Flipper
2. Verifique se há problemas
3. Vá em **"Plugin Manager"** e habilite os plugins necessários

---

### Problema: Erro de conexão no iOS

**Solução:** Verifique se o Flipper está permitido no Firewall
1. Vá em **System Preferences → Security & Privacy → Firewall**
2. Clique em **"Firewall Options"**
3. Adicione o Flipper à lista de apps permitidos

---

### Problema: App não conecta no Android

**Solução 1:** Verifique o ADB
```bash
adb devices
```

**Solução 2:** Reinicie o ADB
```bash
adb kill-server
adb start-server
```

---

## 📚 Recursos Adicionais

- 📖 [Documentação Oficial](https://fbflipper.com/)
- 🎥 [Vídeos Tutoriais](https://www.youtube.com/results?search_query=flipper+react+native)
- 💬 [Comunidade no Discord](https://discord.gg/flipper)
- 🐙 [GitHub](https://github.com/facebook/flipper)

---

## ⚠️ Notas Importantes

> **IMPORTANTE:** O Flipper foi descontinuado pelo Facebook, mas ainda funciona perfeitamente. A versão instalada (v0.273.0) é a última versão estável.

> **DICA:** Para projetos novos, considere usar as **React DevTools** standalone ou o **Reactotron** como alternativas.

> **SEGURANÇA:** Nunca deixe o Flipper habilitado em builds de produção. Ele deve ser usado apenas em desenvolvimento.

---

## 🎉 Pronto para Usar!

Agora você está pronto para usar o Flipper! Siga os passos em [Como Usar](#como-usar) para começar.

**Comando rápido para iniciar:**
```bash
# Terminal 1: Inicie o Metro
npm start

# Terminal 2: Execute o app
npm run ios  # ou npm run android

# Abra o Flipper
open -a Flipper
```

---

**Criado em:** 23 de Novembro de 2025  
**Versão do Flipper:** 0.273.0  
**React Native:** 0.76.5
