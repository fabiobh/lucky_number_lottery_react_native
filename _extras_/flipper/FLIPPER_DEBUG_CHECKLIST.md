# ✅ Checklist de Debug com Flipper

Use este checklist quando estiver debugando problemas no seu app React Native.

---

## 🚀 Antes de Começar

- [ ] Flipper Desktop está instalado
- [ ] Flipper Desktop está aberto
- [ ] Metro Bundler está rodando (`npm start`)
- [ ] App está rodando no simulador/emulador
- [ ] App está conectado ao Flipper (aparece na barra lateral)

---

## 🐛 Debugando Problemas Comuns

### ❌ Problema: "App não carrega dados"

**Checklist:**
- [ ] Abrir plugin **Network** no Flipper
- [ ] Fazer a ação que deveria carregar dados
- [ ] Verificar se a requisição aparece na lista
- [ ] Clicar na requisição e verificar:
  - [ ] Status code (200 = OK, 4xx = erro cliente, 5xx = erro servidor)
  - [ ] URL está correta?
  - [ ] Headers estão corretos (Authorization, Content-Type)?
  - [ ] Body da requisição está correto?
  - [ ] Response tem os dados esperados?
- [ ] Se status 401/403: Verificar token no **AsyncStorage**
- [ ] Se status 500: Ver response para mensagem de erro do servidor
- [ ] Verificar **Logs** para erros de JavaScript

**Ações corretivas:**
- [ ] Corrigir URL da API
- [ ] Adicionar/corrigir headers
- [ ] Atualizar token de autenticação
- [ ] Tratar erros no código

---

### ❌ Problema: "Dados não salvam"

**Checklist:**
- [ ] Abrir plugin **AsyncStorage** no Flipper
- [ ] Executar ação que deveria salvar dados
- [ ] Verificar se a chave aparece na lista
- [ ] Clicar na chave e verificar o valor
- [ ] Verificar **Logs** para erros de salvamento
- [ ] Testar editar valor manualmente no Flipper
- [ ] Recarregar app e ver se mudança persiste

**Ações corretivas:**
- [ ] Verificar se `await` está sendo usado corretamente
- [ ] Adicionar try/catch para capturar erros
- [ ] Verificar se dados estão sendo serializados (JSON.stringify)
- [ ] Verificar permissões de armazenamento

---

### ❌ Problema: "Componente não atualiza"

**Checklist:**
- [ ] Abrir plugin **React DevTools** no Flipper
- [ ] Encontrar componente na árvore
- [ ] Verificar props:
  - [ ] Props estão sendo passadas?
  - [ ] Valores das props estão corretos?
- [ ] Verificar state:
  - [ ] State existe?
  - [ ] Valores do state estão corretos?
- [ ] Testar editar state manualmente
- [ ] Verificar se componente re-renderiza
- [ ] Verificar **Logs** para erros de renderização

**Ações corretivas:**
- [ ] Adicionar `console.log` para verificar fluxo
- [ ] Usar `useEffect` para monitorar mudanças
- [ ] Verificar se `key` está correto em listas
- [ ] Usar `React.memo` se necessário

---

### ❌ Problema: "App está lento"

**Checklist:**
- [ ] Abrir plugin **Performance** no Flipper
- [ ] Usar o app normalmente
- [ ] Verificar FPS:
  - [ ] FPS >= 60? ✅ Ótimo
  - [ ] FPS 30-60? ⚠️ Razoável
  - [ ] FPS < 30? ❌ Problema!
- [ ] Verificar uso de memória:
  - [ ] Memória estável? ✅ OK
  - [ ] Memória aumentando constantemente? ❌ Memory leak!
- [ ] Verificar tempo de renderização:
  - [ ] < 16ms? ✅ OK
  - [ ] > 16ms? ❌ Componente pesado!
- [ ] Identificar componente problemático no **React DevTools**

**Ações corretivas:**
- [ ] Usar `React.memo()` em componentes
- [ ] Implementar `useMemo` e `useCallback`
- [ ] Otimizar FlatList (getItemLayout, removeClippedSubviews)
- [ ] Reduzir re-renders desnecessários
- [ ] Usar bibliotecas de performance (react-native-fast-image)

---

### ❌ Problema: "App crasha"

**Checklist:**
- [ ] Abrir plugin **Logs** no Flipper
- [ ] Reproduzir o crash
- [ ] Verificar último log antes do crash
- [ ] Filtrar por **Errors** (vermelho)
- [ ] Ler stack trace completo
- [ ] Identificar arquivo e linha do erro
- [ ] Verificar **Network** se crash ocorre após requisição

**Ações corretivas:**
- [ ] Adicionar try/catch no código problemático
- [ ] Validar dados antes de usar
- [ ] Verificar se variáveis não são null/undefined
- [ ] Adicionar verificações de tipo

---

### ❌ Problema: "Login não funciona"

**Checklist completo:**
1. **Logs**
   - [ ] Abrir plugin **Logs**
   - [ ] Ver se há erros
   - [ ] Verificar fluxo de execução

2. **Network**
   - [ ] Abrir plugin **Network**
   - [ ] Verificar requisição de login
   - [ ] Status code correto?
   - [ ] Credenciais sendo enviadas?
   - [ ] Response tem token?

3. **AsyncStorage**
   - [ ] Abrir plugin **AsyncStorage**
   - [ ] Token foi salvo?
   - [ ] Chave está correta?
   - [ ] Valor está correto?

4. **React DevTools**
   - [ ] Abrir plugin **React DevTools**
   - [ ] Verificar estado do componente de login
   - [ ] `isLoading` está correto?
   - [ ] `error` tem mensagem?
   - [ ] `user` foi atualizado?

---

## 🔍 Checklist de Inspeção Geral

Use este checklist para revisar o app periodicamente:

### Network
- [ ] Todas as requisições retornam status 2xx?
- [ ] Tempo de resposta é aceitável (< 2s)?
- [ ] Headers estão corretos?
- [ ] Não há requisições duplicadas?

### AsyncStorage
- [ ] Dados sensíveis estão sendo salvos corretamente?
- [ ] Não há dados desnecessários salvos?
- [ ] Chaves têm nomes descritivos?
- [ ] Dados estão sendo limpos quando necessário?

### Logs
- [ ] Não há warnings em vermelho?
- [ ] Logs são descritivos?
- [ ] Não há logs excessivos?
- [ ] Erros estão sendo tratados?

### Performance
- [ ] FPS está >= 60 na maioria do tempo?
- [ ] Uso de memória é estável?
- [ ] Não há memory leaks?
- [ ] Animações são suaves?

### React DevTools
- [ ] Componentes têm props corretas?
- [ ] State está sendo gerenciado corretamente?
- [ ] Não há re-renders desnecessários?
- [ ] Hierarquia de componentes faz sentido?

---

## 📝 Template de Relatório de Bug

Use este template ao reportar bugs:

```markdown
## 🐛 Descrição do Bug
[Descreva o problema]

## 📱 Plataforma
- [ ] iOS
- [ ] Android

## 🔍 Evidências do Flipper

### Network
- Status Code: [ex: 401]
- URL: [ex: https://api.example.com/login]
- Response: [copie a response]

### Logs
```
[Cole os logs relevantes aqui]
```

### AsyncStorage
- Chave: [ex: authToken]
- Valor: [ex: null]

### Performance
- FPS: [ex: 25]
- Memória: [ex: 250MB]

## 🔧 Passos para Reproduzir
1. [Passo 1]
2. [Passo 2]
3. [Passo 3]

## ✅ Comportamento Esperado
[O que deveria acontecer]

## ❌ Comportamento Atual
[O que está acontecendo]

## 📸 Screenshots do Flipper
[Anexe screenshots se possível]
```

---

## 🎯 Checklist de Otimização

Use antes de fazer release:

### Performance
- [ ] FPS >= 60 em todas as telas
- [ ] Tempo de carregamento < 3s
- [ ] Animações suaves
- [ ] Sem memory leaks
- [ ] Imagens otimizadas

### Network
- [ ] Requisições otimizadas (não duplicadas)
- [ ] Cache implementado onde possível
- [ ] Timeout configurado
- [ ] Retry logic implementado
- [ ] Erro handling adequado

### AsyncStorage
- [ ] Dados sensíveis não salvos em plain text
- [ ] Limpeza de dados antigos implementada
- [ ] Migração de dados implementada (se necessário)
- [ ] Backup/restore implementado

### Logs
- [ ] Logs de produção removidos/desabilitados
- [ ] Apenas logs essenciais mantidos
- [ ] Crash reporting configurado
- [ ] Analytics configurado

---

## 🚨 Checklist de Emergência

Use quando o app está com problemas críticos:

**Passo 1: Informações Básicas**
- [ ] Qual é o problema exato?
- [ ] Quando começou?
- [ ] Afeta iOS, Android ou ambos?
- [ ] Afeta todos os usuários ou apenas alguns?

**Passo 2: Flipper**
- [ ] Flipper está conectado?
- [ ] Consegue reproduzir o problema?
- [ ] Capturou logs do erro?
- [ ] Capturou requisições de rede?

**Passo 3: Análise Rápida**
- [ ] Verificou **Logs** para erros críticos?
- [ ] Verificou **Network** para falhas de API?
- [ ] Verificou **Performance** para problemas de memória?
- [ ] Verificou **AsyncStorage** para dados corrompidos?

**Passo 4: Ação Imediata**
- [ ] Identificou a causa raiz?
- [ ] Tem um fix rápido?
- [ ] Precisa fazer rollback?
- [ ] Precisa notificar usuários?

---

## 📚 Recursos

- [Guia Completo do Flipper](./FLIPPER_GUIDE.md)
- [Referência Rápida](./FLIPPER_QUICK_REFERENCE.md)
- [Exemplos Práticos](./FLIPPER_EXAMPLES.md)

---

**Dica:** Imprima este checklist e mantenha próximo durante desenvolvimento! 📋

**Criado em:** 23 de Novembro de 2025
