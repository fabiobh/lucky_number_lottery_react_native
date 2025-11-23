# Documentação de Testes Unitários

## 📋 Visão Geral

Este documento descreve a suíte de testes unitários implementada para o aplicativo **Lucky Number Lottery**. Os testes foram desenvolvidos utilizando **Jest** e **React Native Testing Library** para garantir a qualidade, confiabilidade e manutenibilidade do código.

## 🎯 Objetivo dos Testes

Os testes unitários têm como objetivo:

- ✅ Validar a lógica de negócio do aplicativo
- ✅ Garantir que as funções utilitárias funcionem corretamente
- ✅ Verificar o comportamento dos contextos React
- ✅ Assegurar a consistência dos temas e cores
- ✅ Prevenir regressões durante o desenvolvimento
- ✅ Facilitar refatorações futuras com confiança

## 📁 Estrutura dos Testes

```
__tests__/
├── constants.test.ts                      # Testes de constantes e cores
├── contexts/
│   ├── DrawnNumbersContext.test.tsx      # Testes do contexto de números sorteados
│   └── ThemeContext.test.tsx             # Testes do contexto de tema
└── utils/
    └── gameUtils.test.ts                 # Testes das funções utilitárias do jogo
```

## 🧪 Descrição dos Testes

### 1. **gameUtils.test.ts** - Funções Utilitárias do Jogo

**Arquivo testado:** `src/utils/gameUtils.ts`

#### Função: `generateCards()`

Esta função é responsável por gerar as cartelas do jogo com números aleatórios.

**Testes implementados:**

- ✅ **Quantidade correta de cartelas**: Verifica se o número de cartelas geradas corresponde ao solicitado
- ✅ **Números por cartela**: Confirma que cada cartela possui a quantidade correta de números
- ✅ **Unicidade dos números**: Garante que não há números duplicados em uma mesma cartela
- ✅ **Intervalo válido**: Valida que todos os números estão dentro do intervalo esperado (1 até totalNumbers)
- ✅ **Ordenação**: Verifica se os números em cada cartela estão ordenados
- ✅ **Casos extremos**: Testa valores mínimos e máximos
- ✅ **Geração em larga escala**: Valida o comportamento com 100 cartelas

**Exemplo de teste:**
```typescript
it('should generate cards with unique numbers', () => {
  const cards = generateCards(5, 10, 50);
  cards.forEach(card => {
    const uniqueNumbers = new Set(card);
    expect(uniqueNumbers.size).toBe(10);
  });
});
```

#### Função: `checkWin()`

Esta função verifica se uma cartela foi completada com base nos números sorteados.

**Testes implementados:**

- ✅ **Vitória completa**: Verifica quando todos os números da cartela foram sorteados
- ✅ **Vitória incompleta**: Confirma que retorna `false` quando faltam números
- ✅ **Sem números sorteados**: Testa o comportamento com array vazio de números sorteados
- ✅ **Cartela vazia**: Valida o comportamento com cartela sem números
- ✅ **Cartela com um número**: Testa casos extremos com apenas um número
- ✅ **Correspondência exata**: Verifica quando cartela e números sorteados são idênticos
- ✅ **Números duplicados**: Garante que duplicatas nos números sorteados não afetam o resultado

**Exemplo de teste:**
```typescript
it('should return true when all card numbers are drawn', () => {
  const card = [5, 12, 23, 34, 45];
  const drawnNumbers = [1, 5, 12, 15, 23, 34, 40, 45, 50];
  const result = checkWin(card, drawnNumbers);
  expect(result).toBe(true);
});
```

---

### 2. **constants.test.ts** - Constantes de Cores e Temas

**Arquivo testado:** `src/constants.ts`

#### Testes de `LightColors`

**Testes implementados:**

- ✅ **Propriedades obrigatórias**: Verifica se todas as cores necessárias estão definidas
- ✅ **Formato hexadecimal**: Valida que todas as cores estão no formato `#RRGGBB`
- ✅ **Valores específicos**: Confirma valores de cores importantes (primary, secondary, etc.)

#### Testes de `DarkColors`

**Testes implementados:**

- ✅ **Propriedades obrigatórias**: Verifica se todas as cores necessárias estão definidas
- ✅ **Formato hexadecimal**: Valida o formato correto das cores
- ✅ **Valores específicos**: Confirma valores de cores do tema escuro
- ✅ **Diferenciação**: Garante que cores importantes diferem do tema claro

#### Função: `getColors()`

**Testes implementados:**

- ✅ **Retorno correto para modo claro**: Verifica se retorna `LightColors` quando `isDarkMode = false`
- ✅ **Retorno correto para modo escuro**: Verifica se retorna `DarkColors` quando `isDarkMode = true`
- ✅ **Diferenciação entre temas**: Confirma que os temas têm cores diferentes
- ✅ **Consistência da cor primária**: Valida que a cor primária é a mesma em ambos os temas

#### Consistência entre Temas

**Testes implementados:**

- ✅ **Mesma quantidade de propriedades**: Garante que ambos os temas têm o mesmo número de cores
- ✅ **Nomes de propriedades correspondentes**: Verifica que as chaves são idênticas em ambos os temas

---

### 3. **DrawnNumbersContext.test.tsx** - Contexto de Números Sorteados

**Arquivo testado:** `src/contexts/DrawnNumbersContext.tsx`

Este contexto gerencia o estado global dos números sorteados, cartelas completadas e ordem dos vencedores.

#### Estado Inicial

**Testes implementados:**

- ✅ **Array vazio de números sorteados**: `drawnNumbers = []`
- ✅ **Último número sorteado zerado**: `lastDrawnNumber = 0`
- ✅ **Set vazio de cartelas completadas**: `completedCards = new Set()`
- ✅ **Array vazio de ordem de vencedores**: `winnerOrder = []`

#### Função: `setDrawnNumbers()`

**Testes implementados:**

- ✅ **Atualização com array**: Define números diretamente
- ✅ **Atualização com função**: Usa função callback para atualizar baseado no estado anterior
- ✅ **Substituição completa**: Verifica que novos valores substituem os antigos

#### Função: `setLastDrawnNumber()`

**Testes implementados:**

- ✅ **Atualização simples**: Define o último número sorteado
- ✅ **Múltiplas atualizações**: Verifica atualizações consecutivas

#### Função: `setCompletedCards()`

**Testes implementados:**

- ✅ **Atualização com Set**: Define cartelas completadas
- ✅ **Atualização com função**: Adiciona novas cartelas ao Set existente
- ✅ **Unicidade do Set**: Garante que não há duplicatas

#### Função: `setWinnerOrder()`

**Testes implementados:**

- ✅ **Atualização com array**: Define a ordem dos vencedores
- ✅ **Atualização com função**: Adiciona vencedores à lista
- ✅ **Manutenção da ordem**: Verifica que a ordem é preservada

#### Cenários de Integração

**Testes implementados:**

- ✅ **Fluxo completo do jogo**: Simula um jogo do início ao fim
- ✅ **Múltiplos vencedores**: Testa cenário com várias cartelas vencedoras
- ✅ **Reset do estado**: Verifica a capacidade de reiniciar o jogo

#### Tratamento de Erros

**Testes implementados:**

- ✅ **Uso fora do Provider**: Garante que lança erro quando usado incorretamente

**Exemplo de teste:**
```typescript
it('should handle complete game flow', () => {
  const {result} = renderHook(() => useDrawnNumbers(), {wrapper});
  
  act(() => {
    result.current.setLastDrawnNumber(15);
    result.current.setDrawnNumbers([15]);
  });
  
  expect(result.current.lastDrawnNumber).toBe(15);
  expect(result.current.drawnNumbers).toEqual([15]);
});
```

---

### 4. **ThemeContext.test.tsx** - Contexto de Tema

**Arquivo testado:** `src/contexts/ThemeContext.tsx`

Este contexto gerencia o tema do aplicativo (claro/escuro) e persiste a preferência do usuário.

#### Estado Inicial

**Testes implementados:**

- ✅ **Modo claro por padrão**: Inicializa com `isDarkMode = false`
- ✅ **Carregamento do tema salvo (escuro)**: Recupera preferência do AsyncStorage
- ✅ **Carregamento do tema salvo (claro)**: Recupera preferência do AsyncStorage
- ✅ **Chamada ao AsyncStorage**: Verifica que `getItem` é chamado na montagem

#### Função: `toggleTheme()`

**Testes implementados:**

- ✅ **Alternância claro → escuro**: Muda de light para dark mode
- ✅ **Alternância escuro → claro**: Muda de dark para light mode
- ✅ **Múltiplas alternâncias**: Testa várias mudanças consecutivas
- ✅ **Persistência**: Verifica que a preferência é salva no AsyncStorage

#### Tratamento de Erros

**Testes implementados:**

- ✅ **Erro ao carregar do AsyncStorage**: Trata graciosamente falhas de leitura
- ✅ **Erro ao salvar no AsyncStorage**: Trata graciosamente falhas de escrita
- ✅ **Uso fora do Provider**: Lança erro apropriado

#### Integração com AsyncStorage

**Testes implementados:**

- ✅ **Leitura única na montagem**: `getItem` chamado apenas uma vez
- ✅ **Escrita a cada alternância**: `setItem` chamado em cada toggle

**Exemplo de teste:**
```typescript
it('should toggle from light to dark mode', async () => {
  const {result} = renderHook(() => useTheme(), {wrapper});
  
  await waitFor(() => {
    expect(result.current.isDarkMode).toBe(false);
  });
  
  await act(async () => {
    await result.current.toggleTheme();
  });
  
  expect(result.current.isDarkMode).toBe(true);
  expect(AsyncStorage.setItem).toHaveBeenCalledWith('app_theme', 'dark');
});
```

---

## 🚀 Como Executar os Testes

### Executar todos os testes
```bash
npm test
```

### Executar testes em modo watch
```bash
npm test -- --watch
```

### Executar testes com cobertura
```bash
npm test -- --coverage
```

### Executar um arquivo específico
```bash
npm test -- gameUtils.test.ts
```

### Executar testes de um diretório específico
```bash
npm test -- __tests__/contexts/
```

---

## 📊 Cobertura de Testes

Os testes cobrem as seguintes áreas:

| Módulo | Arquivo | Cobertura |
|--------|---------|-----------|
| Utilitários | `gameUtils.ts` | ✅ Completa |
| Constantes | `constants.ts` | ✅ Completa |
| Contextos | `DrawnNumbersContext.tsx` | ✅ Completa |
| Contextos | `ThemeContext.tsx` | ✅ Completa |

---

## 🛠️ Tecnologias Utilizadas

- **Jest**: Framework de testes JavaScript
- **@testing-library/react-native**: Biblioteca para testar componentes React Native
- **@testing-library/react-hooks**: Utilitários para testar hooks React
- **@react-native-async-storage/async-storage**: Mock para testes de persistência

---

## 📝 Boas Práticas Implementadas

1. ✅ **Testes isolados**: Cada teste é independente e não afeta outros
2. ✅ **Nomenclatura clara**: Descrições descritivas usando `describe` e `it`
3. ✅ **Arrange-Act-Assert**: Estrutura clara em cada teste
4. ✅ **Mocks apropriados**: AsyncStorage e outras dependências são mockadas
5. ✅ **Limpeza entre testes**: `beforeEach` garante estado limpo
6. ✅ **Testes de casos extremos**: Validação de edge cases
7. ✅ **Testes de integração**: Cenários completos de uso
8. ✅ **Tratamento de erros**: Validação de comportamento em situações de erro

---

## 🔄 Manutenção dos Testes

### Quando adicionar novos testes:

- Ao criar novas funções utilitárias
- Ao adicionar novos contextos
- Ao modificar lógica de negócio existente
- Ao corrigir bugs (adicionar teste de regressão)

### Quando atualizar testes existentes:

- Ao refatorar código
- Ao mudar comportamento esperado
- Ao adicionar novos casos de uso

---

## 🐛 Debugging de Testes

### Ver output detalhado:
```bash
npm test -- --verbose
```

### Executar apenas testes que falharam:
```bash
npm test -- --onlyFailures
```

### Debug com breakpoints:
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

---

## 📚 Recursos Adicionais

- [Documentação do Jest](https://jestjs.io/docs/getting-started)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Testing Library - Boas Práticas](https://testing-library.com/docs/guiding-principles)

---

## ✅ Checklist de Qualidade

- [x] Todos os testes passam
- [x] Cobertura de código adequada
- [x] Testes são rápidos e eficientes
- [x] Testes são legíveis e bem documentados
- [x] Casos extremos são cobertos
- [x] Erros são tratados apropriadamente
- [x] Mocks são utilizados corretamente
- [x] Testes são independentes entre si

---

## 📞 Suporte

Para dúvidas ou problemas com os testes, consulte a documentação ou entre em contato com a equipe de desenvolvimento.

---

**Última atualização:** 23 de novembro de 2025
