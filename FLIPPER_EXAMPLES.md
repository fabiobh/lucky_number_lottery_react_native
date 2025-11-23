# 🎯 Exemplos Práticos de Uso do Flipper

Este documento mostra exemplos práticos de como usar o Flipper para debugar problemas comuns no seu app React Native.

---

## 📋 Índice
1. [Debug de AsyncStorage](#1-debug-de-asyncstorage)
2. [Debug de Requisições de Rede](#2-debug-de-requisições-de-rede)
3. [Debug de Componentes React](#3-debug-de-componentes-react)
4. [Debug de Performance](#4-debug-de-performance)
5. [Debug de Logs](#5-debug-de-logs)

---

## 1. 🗄️ Debug de AsyncStorage

### Cenário: Verificar se dados estão sendo salvos corretamente

**Exemplo de código no app:**
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Salvar dados
const saveUserData = async (userData) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    console.log('✅ Dados salvos com sucesso');
  } catch (error) {
    console.error('❌ Erro ao salvar dados:', error);
  }
};

// Ler dados
const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('❌ Erro ao ler dados:', error);
    return null;
  }
};
```

**Como debugar no Flipper:**

1. **Abra o Flipper** e conecte ao seu app
2. **Selecione o plugin "Async Storage"** na barra lateral
3. **Execute a função** `saveUserData` no seu app
4. **No Flipper**, você verá:
   - A chave `user` aparecer na lista
   - O valor JSON completo
5. **Teste editar o valor**:
   - Clique na chave `user`
   - Edite o JSON diretamente
   - Clique em "Save"
   - Recarregue o app para ver as mudanças

**Casos de uso:**
- ✅ Verificar se dados foram salvos
- ✅ Testar app com diferentes estados
- ✅ Limpar cache durante desenvolvimento
- ✅ Debugar problemas de persistência

---

## 2. 🌐 Debug de Requisições de Rede

### Cenário: API retorna erro 401 (Unauthorized)

**Exemplo de código no app:**
```javascript
const fetchUserProfile = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    
    const response = await fetch('https://api.example.com/user/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    console.log('📊 Dados recebidos:', data);
    return data;
  } catch (error) {
    console.error('❌ Erro na requisição:', error);
  }
};
```

**Como debugar no Flipper:**

1. **Abra o plugin "Network"** no Flipper
2. **Execute a função** `fetchUserProfile` no app
3. **No Flipper**, você verá a requisição listada com:
   - 🔴 Status: 401 (em vermelho)
   - URL: `https://api.example.com/user/profile`
   - Método: GET
   - Tempo de resposta
4. **Clique na requisição** para ver detalhes:
   - **Request Headers**: Verifique se o token está correto
   - **Response**: Veja a mensagem de erro
   - **Timing**: Veja quanto tempo levou

**Exemplo de análise:**
```
Request Headers:
  Authorization: Bearer null  ❌ PROBLEMA: Token está null!
  Content-Type: application/json

Response (401):
{
  "error": "Invalid or missing authentication token"
}
```

**Solução identificada:**
- O token não está sendo recuperado do AsyncStorage
- Verifique se o login salvou o token corretamente

**Casos de uso:**
- ✅ Debugar erros de autenticação
- ✅ Verificar headers enviados
- ✅ Analisar tempo de resposta
- ✅ Ver dados enviados e recebidos

---

## 3. 📱 Debug de Componentes React

### Cenário: Componente não atualiza quando props mudam

**Exemplo de código no app:**
```javascript
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const Counter = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);
  
  return (
    <View>
      <Text>Contador: {count}</Text>
      <Button 
        title="Incrementar" 
        onPress={() => setCount(count + 1)} 
      />
    </View>
  );
};

export default Counter;
```

**Como debugar no Flipper:**

1. **Abra o plugin "React DevTools"** no Flipper
2. **Encontre o componente** `Counter` na árvore
3. **Veja as props e state**:
   ```
   Props:
     initialCount: 0
   
   State:
     count: 5
   ```
4. **Teste editar o state**:
   - Clique no valor de `count`
   - Mude para `10`
   - Veja o componente atualizar em tempo real!

**Casos de uso:**
- ✅ Verificar se props estão sendo passadas corretamente
- ✅ Debugar problemas de estado
- ✅ Identificar re-renders desnecessários
- ✅ Testar diferentes valores sem recompilar

---

## 4. 📊 Debug de Performance

### Cenário: App está lento ao rolar uma lista

**Exemplo de código no app:**
```javascript
import React from 'react';
import { FlatList, View, Text } from 'react-native';

const SlowList = ({ items }) => {
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <View style={{ padding: 20 }}>
          <Text>{item.title}</Text>
          {/* Componente pesado aqui */}
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};
```

**Como debugar no Flipper:**

1. **Abra o plugin "Performance"** no Flipper
2. **Role a lista** no app
3. **No Flipper**, observe:
   - **FPS (Frames por segundo)**:
     - ✅ 60 FPS = Ótimo
     - ⚠️ 30-60 FPS = Razoável
     - ❌ < 30 FPS = Problema!
   - **Uso de memória**: Deve ser estável
   - **Tempo de renderização**: Deve ser < 16ms

**Análise:**
```
FPS: 25 ❌ Muito baixo!
Memória: 150MB → 250MB ⚠️ Aumentando
Render time: 45ms ❌ Muito alto!
```

**Soluções possíveis:**
- Use `React.memo()` para evitar re-renders
- Implemente `getItemLayout` no FlatList
- Use `removeClippedSubviews={true}`
- Otimize o componente renderizado

**Casos de uso:**
- ✅ Identificar gargalos de performance
- ✅ Otimizar animações
- ✅ Detectar memory leaks
- ✅ Melhorar experiência do usuário

---

## 5. 📝 Debug de Logs

### Cenário: Entender fluxo de execução

**Exemplo de código no app:**
```javascript
const loginUser = async (email, password) => {
  console.log('🔵 [LOGIN] Iniciando login...');
  console.log('🔵 [LOGIN] Email:', email);
  
  try {
    console.log('🔵 [LOGIN] Fazendo requisição...');
    const response = await fetch('https://api.example.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    console.log('🔵 [LOGIN] Status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ [LOGIN] Login bem-sucedido!');
      console.log('✅ [LOGIN] Token:', data.token);
      
      await AsyncStorage.setItem('authToken', data.token);
      console.log('✅ [LOGIN] Token salvo no AsyncStorage');
      
      return { success: true, data };
    } else {
      console.error('❌ [LOGIN] Erro:', response.status);
      return { success: false, error: 'Credenciais inválidas' };
    }
  } catch (error) {
    console.error('❌ [LOGIN] Exceção:', error);
    return { success: false, error: error.message };
  }
};
```

**Como debugar no Flipper:**

1. **Abra o plugin "Logs"** no Flipper
2. **Execute a função** `loginUser` no app
3. **No Flipper**, você verá todos os logs em ordem:
   ```
   🔵 [LOGIN] Iniciando login...
   🔵 [LOGIN] Email: user@example.com
   🔵 [LOGIN] Fazendo requisição...
   🔵 [LOGIN] Status: 200
   ✅ [LOGIN] Login bem-sucedido!
   ✅ [LOGIN] Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ✅ [LOGIN] Token salvo no AsyncStorage
   ```

**Recursos úteis:**
- **Filtrar por tipo**:
  - 🔵 Info (console.log)
  - ⚠️ Warning (console.warn)
  - ❌ Error (console.error)
- **Buscar por texto**: Digite "[LOGIN]" para ver só logs de login
- **Limpar logs**: Botão "Clear" para começar do zero

**Casos de uso:**
- ✅ Entender fluxo de execução
- ✅ Identificar onde o código está falhando
- ✅ Debugar lógica complexa
- ✅ Monitorar eventos do app

---

## 🎯 Workflow Completo de Debug

### Exemplo: Debugar problema de "Usuário não consegue fazer login"

**Passo 1: Verificar Logs**
1. Abra o plugin "Logs" no Flipper
2. Execute o login no app
3. Veja se há erros nos logs

**Passo 2: Verificar Requisição de Rede**
1. Abra o plugin "Network"
2. Veja a requisição de login
3. Verifique:
   - Status code (200? 401? 500?)
   - Headers (Content-Type correto?)
   - Body da requisição (email e senha estão sendo enviados?)
   - Response (qual mensagem de erro?)

**Passo 3: Verificar AsyncStorage**
1. Se o login foi bem-sucedido (status 200)
2. Abra o plugin "AsyncStorage"
3. Verifique se o token foi salvo na chave `authToken`

**Passo 4: Verificar Componentes**
1. Abra o plugin "React DevTools"
2. Encontre o componente de Login
3. Verifique o estado:
   - `isLoading` está correto?
   - `error` tem alguma mensagem?
   - `user` foi atualizado?

**Resultado:**
Com esses 4 passos, você consegue identificar exatamente onde está o problema!

---

## 💡 Dicas Avançadas

### 1. Combine Plugins
Use múltiplos plugins ao mesmo tempo:
- **Network + Logs**: Veja requisições e logs simultaneamente
- **AsyncStorage + React DevTools**: Veja dados salvos e estado dos componentes
- **Performance + Logs**: Identifique código lento

### 2. Use Prefixos nos Logs
```javascript
console.log('🔵 [COMPONENT_NAME] Mensagem');
console.warn('⚠️ [COMPONENT_NAME] Aviso');
console.error('❌ [COMPONENT_NAME] Erro');
```
Facilita filtrar logs no Flipper!

### 3. Teste Cenários Extremos
Use o AsyncStorage Inspector para:
- Testar app sem token (usuário deslogado)
- Testar app com token expirado
- Testar app com dados corrompidos

### 4. Monitore em Tempo Real
Deixe o Flipper aberto enquanto usa o app normalmente. Você verá:
- Todas as requisições sendo feitas
- Todos os logs sendo gerados
- Mudanças no AsyncStorage
- Performance em tempo real

---

## 🎓 Exercícios Práticos

### Exercício 1: Debug de Login
1. Implemente uma tela de login
2. Use o Flipper para verificar:
   - Se a requisição está sendo feita corretamente
   - Se o token está sendo salvo
   - Se os logs estão aparecendo

### Exercício 2: Debug de Lista
1. Crie uma FlatList com 100 itens
2. Use o Performance Monitor para verificar FPS
3. Otimize até alcançar 60 FPS

### Exercício 3: Debug de Estado
1. Crie um componente com estado complexo
2. Use o React DevTools para inspecionar
3. Edite o estado em tempo real e veja as mudanças

---

## 📚 Recursos Adicionais

- 📖 [Guia Completo do Flipper](./FLIPPER_GUIDE.md)
- ⚡ [Referência Rápida](./FLIPPER_QUICK_REFERENCE.md)
- 🌐 [Documentação Oficial](https://fbflipper.com/)

---

**Criado em:** 23 de Novembro de 2025  
**Última atualização:** 23 de Novembro de 2025
