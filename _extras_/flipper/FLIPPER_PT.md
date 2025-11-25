# 🐬 Flipper - Debug para React Native

## ✅ Instalação Completa!

O Flipper foi instalado e configurado com sucesso no seu projeto! 🎉

---

## 🚀 Como Começar

### Opção 1: Script Automático (Mais Fácil)
```bash
./start-with-flipper.sh ios     # Para iOS
./start-with-flipper.sh android # Para Android
```

### Opção 2: Menu Interativo
```bash
./flipper-commands.sh
```
Este script mostra um menu com várias opções úteis!

### Opção 3: Manual
```bash
# Terminal 1: Abrir Flipper
open -a Flipper

# Terminal 2: Iniciar Metro
npm start

# Terminal 3: Executar app
npm run ios  # ou npm run android
```

---

## 📚 Documentação Completa

Criamos 5 documentos completos para você:

### 1. 📖 [FLIPPER_GUIDE.md](./FLIPPER_GUIDE.md)
**Guia completo e detalhado** com tudo sobre o Flipper:
- O que é o Flipper
- Como instalar e configurar
- Todos os recursos disponíveis
- Plugins úteis
- Troubleshooting completo

**Leia este primeiro!** 👈

### 2. ⚡ [FLIPPER_QUICK_REFERENCE.md](./FLIPPER_QUICK_REFERENCE.md)
**Referência rápida** para consulta durante o desenvolvimento:
- Comandos essenciais
- Atalhos de teclado
- Casos de uso comuns
- Troubleshooting rápido

**Mantenha aberto enquanto desenvolve!** 👈

### 3. 🎯 [FLIPPER_EXAMPLES.md](./FLIPPER_EXAMPLES.md)
**Exemplos práticos** de como usar o Flipper:
- Debug de AsyncStorage
- Debug de requisições de rede
- Debug de componentes React
- Debug de performance
- Debug de logs
- Workflow completo de debug

**Aprenda com exemplos reais!** 👈

### 4. ✅ [FLIPPER_DEBUG_CHECKLIST.md](./FLIPPER_DEBUG_CHECKLIST.md)
**Checklist completo** para debugar problemas:
- Checklist para problemas comuns
- Template de relatório de bug
- Checklist de otimização
- Checklist de emergência

**Use ao debugar problemas!** 👈

### 5. 📄 [FLIPPER_README.txt](./FLIPPER_README.txt)
**Resumo visual** em ASCII art com informações essenciais.

**Para consulta rápida!** 👈

---

## 🛠️ O Que o Flipper Faz?

O Flipper é uma ferramenta de debug visual que permite:

### 🌐 Network Inspector
- Monitora todas as requisições HTTP/HTTPS
- Vê headers, body, response
- Analisa tempo de resposta
- Identifica erros de API

### 💾 AsyncStorage Inspector
- Visualiza todos os dados salvos
- Edita valores em tempo real
- Deleta chaves
- Testa diferentes estados do app

### 📱 React DevTools
- Inspeciona componentes React
- Vê props e state de cada componente
- Edita valores em tempo real
- Identifica re-renders desnecessários

### 📊 Performance Monitor
- Monitora FPS (frames por segundo)
- Analisa uso de memória
- Detecta memory leaks
- Identifica componentes lentos

### 📝 Logs
- Mostra todos os console.log, warn, error
- Filtra por tipo de log
- Busca por texto específico
- Vê stack traces completos

### 🎨 Layout Inspector
- Inspeciona hierarquia de views
- Vê estilos aplicados
- Debuga problemas de layout
- Identifica views escondidas

---

## 🎯 Quando Usar o Flipper?

### ❌ API não funciona?
→ Use o **Network Inspector** para ver a requisição completa

### ❌ Dados não salvam?
→ Use o **AsyncStorage Inspector** para verificar os dados

### ❌ Componente não atualiza?
→ Use o **React DevTools** para inspecionar props e state

### ❌ App está lento?
→ Use o **Performance Monitor** para identificar gargalos

### ❌ Erro no código?
→ Use os **Logs** para ver o stack trace completo

---

## 💡 Dicas Importantes

### ✅ Sempre deixe o Flipper aberto durante desenvolvimento
Você verá todos os logs, requisições e mudanças em tempo real!

### ✅ Use prefixos nos seus logs
```javascript
console.log('🔵 [LOGIN] Iniciando login...');
console.error('❌ [LOGIN] Erro ao fazer login');
```
Facilita filtrar logs no Flipper!

### ✅ Combine múltiplos plugins
Use Network + Logs + AsyncStorage juntos para debug completo!

### ✅ Teste cenários extremos
Use o AsyncStorage Inspector para testar o app sem dados, com dados corrompidos, etc.

---

## 🐛 Problemas Comuns

### Flipper não detecta o app?
```bash
npm start -- --reset-cache
```

### Plugin não aparece?
Vá em **Plugin Manager** no Flipper e habilite o plugin.

### Erro de conexão no iOS?
Verifique o **Firewall do macOS** e permita o Flipper.

### Erro de conexão no Android?
```bash
adb devices
adb kill-server && adb start-server
```

---

## ⚠️ Importante

### 🔴 Flipper foi descontinuado
O Facebook descontinuou o Flipper, mas ele ainda funciona perfeitamente!
- Versão instalada: **0.273.0** (última versão estável)
- Será desabilitado no Homebrew em **01/12/2025**
- Continue usando normalmente para desenvolvimento

### 🔴 Nunca use em produção
- O Flipper é **APENAS para desenvolvimento**
- Remova `react-native-flipper` antes de fazer release
- Desabilite logs de debug em produção

---

## 📖 Próximos Passos

1. **Leia o guia completo**: [FLIPPER_GUIDE.md](./FLIPPER_GUIDE.md)
2. **Teste os exemplos**: [FLIPPER_EXAMPLES.md](./FLIPPER_EXAMPLES.md)
3. **Execute o app**: `./start-with-flipper.sh ios`
4. **Explore os plugins** disponíveis no Flipper
5. **Use o checklist**: [FLIPPER_DEBUG_CHECKLIST.md](./FLIPPER_DEBUG_CHECKLIST.md)

---

## 🎉 Pronto!

Agora você tem tudo que precisa para debugar seu app React Native como um profissional! 🚀

**Execute agora:**
```bash
./start-with-flipper.sh ios
```

E comece a explorar o Flipper! 🐬

---

## 📞 Recursos Adicionais

- 🌐 [Documentação Oficial](https://fbflipper.com/)
- 🐙 [GitHub](https://github.com/facebook/flipper)
- 📺 [Vídeos Tutoriais](https://www.youtube.com/results?search_query=flipper+react+native)

---

**Instalado em:** 23 de Novembro de 2025  
**Versão do Flipper:** 0.273.0  
**React Native:** 0.76.5

**Bom debug! 🐬✨**
