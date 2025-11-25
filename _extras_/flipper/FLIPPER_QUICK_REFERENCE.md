# 🚀 Flipper - Guia Rápido de Referência

## ⚡ Início Rápido

### Opção 1: Script Automático
```bash
./start-with-flipper.sh ios     # Para iOS
./start-with-flipper.sh android # Para Android
```

### Opção 2: Manual
```bash
# Terminal 1: Abrir Flipper
open -a Flipper

# Terminal 2: Iniciar Metro
npm start

# Terminal 3: Executar app
npm run ios  # ou npm run android
```

---

## 🔧 Principais Plugins e Atalhos

| Plugin | Atalho | O que faz |
|--------|--------|-----------|
| **React DevTools** | `Cmd+D` → DevTools | Inspeciona componentes React |
| **Network** | - | Monitora requisições HTTP |
| **AsyncStorage** | - | Visualiza dados salvos |
| **Logs** | - | Mostra console.log, warn, error |
| **Layout** | - | Inspeciona hierarquia de views |
| **Performance** | - | Monitora FPS e memória |

---

## 🐛 Comandos de Debug Úteis

### No App (Shake ou Cmd+D no iOS / Cmd+M no Android)
- **Reload** - Recarrega o app
- **Debug** - Abre Chrome DevTools
- **Show Inspector** - Inspeciona elementos
- **Show Perf Monitor** - Mostra FPS

### No Terminal
```bash
# Limpar cache e reiniciar
npm start -- --reset-cache

# Limpar build iOS
npm run clean:ios

# Ver logs do iOS
npx react-native log-ios

# Ver logs do Android
npx react-native log-android
```

---

## 📊 Casos de Uso Comuns

### 1. API não retorna dados
1. Abra **Network** no Flipper
2. Faça a requisição no app
3. Verifique:
   - ✅ Status code (200, 404, 500?)
   - ✅ Headers (Authorization correto?)
   - ✅ Response body (dados corretos?)

### 2. Dados não salvam no AsyncStorage
1. Abra **AsyncStorage** no Flipper
2. Verifique se a chave existe
3. Veja o valor salvo
4. Teste editar/deletar

### 3. Componente não renderiza corretamente
1. Abra **React DevTools** no Flipper
2. Encontre o componente na árvore
3. Verifique props e state
4. Edite valores para testar

### 4. App está lento
1. Abra **Performance** no Flipper
2. Monitore FPS (deve estar ~60)
3. Verifique uso de memória
4. Identifique componentes pesados

---

## ⚠️ Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| Flipper não detecta app | Reinicie Metro: `npm start -- --reset-cache` |
| Plugin não aparece | Vá em Plugin Manager e habilite |
| Erro de conexão iOS | Verifique Firewall do macOS |
| Erro de conexão Android | Execute `adb devices` |

---

## 📝 Dicas Pro

1. **Use filtros nos Logs** - Filtre por "error", "warning", etc.
2. **Salve requisições** - Clique com botão direito → Copy as cURL
3. **Edite AsyncStorage** - Teste diferentes estados do app
4. **Use o Inspector** - Cmd+D → Show Inspector para inspecionar UI
5. **Monitore Performance** - Sempre de olho no FPS durante desenvolvimento

---

## 🔗 Links Úteis

- 📖 [Guia Completo](./FLIPPER_GUIDE.md)
- 🌐 [Documentação Oficial](https://fbflipper.com/)
- 🐙 [GitHub](https://github.com/facebook/flipper)

---

**Versão:** 0.273.0 | **Última atualização:** 23/11/2025
