# Guia de Geração de Screenshots com Fastlane

Este guia explica como gerar screenshots automaticamente do app em todos os dispositivos iOS.

## 📋 Pré-requisitos

### 1. Instalar Fastlane

**RECOMENDADO - Usando Homebrew (mais rápido, menos dependências):**
```bash
brew install fastlane
```

**Alternativa - Usando RubyGems (instala muitas dependências do Google/AWS que não são necessárias):**
```bash
sudo gem install fastlane -NV
```

### 2. Instalar dependências do iOS

```bash
cd ios
pod install
cd ..
```

### 3. Configurar o Xcode

Certifique-se de que o scheme está configurado como "Shared":
1. Abra o projeto no Xcode: `open ios/lucky_number_bingo_community_cli.xcworkspace`
2. Product > Scheme > Manage Schemes
3. Marque "Shared" para o scheme `lucky_number_bingo_community_cli`

## 🚀 Como Gerar Screenshots

### Método 1: Usando npm script (Recomendado)

```bash
npm run screenshots
```

### Método 2: Usando Fastlane diretamente

```bash
cd ios
fastlane screenshots
```

## 📤 Como Fazer Upload para App Store Connect (Opcional)

Depois de gerar os screenshots, você pode fazer upload automático para App Store Connect:

### 1. Configurar credenciais

Edite o arquivo `fastlane/Appfile` e adicione:
- `itc_team_id`: ID do seu time na App Store Connect
- `team_id`: ID do seu time no Developer Portal

### 2. Fazer upload

```bash
cd ios
fastlane upload_screenshots
```

Ou gerar e fazer upload em um único comando:

```bash
cd ios
fastlane screenshots_and_upload
```

## 📱 Dispositivos Configurados

Os screenshots serão gerados para os seguintes dispositivos:

- iPhone 15 Pro Max (6.7")
- iPhone 15 Pro (6.1")
- iPhone 15 (6.1")
- iPhone SE 3ª geração (4.7")
- iPad Pro 12.9" (6ª geração)
- iPad Pro 11" (4ª geração)

## 🌍 Idiomas Configurados

- Português (pt-BR)
- Inglês (en-US)

## 📂 Onde os Screenshots São Salvos

Os screenshots serão salvos em:

```
fastlane/screenshots/
├── pt-BR/
│   ├── iPhone 15 Pro Max/
│   ├── iPhone 15 Pro/
│   ├── iPhone 15/
│   ├── iPhone SE (3rd generation)/
│   ├── iPad Pro (12.9-inch) (6th generation)/
│   └── iPad Pro (11-inch) (4th generation)/
└── en-US/
    ├── iPhone 15 Pro Max/
    ├── iPhone 15 Pro/
    ├── iPhone 15/
    ├── iPhone SE (3rd generation)/
    ├── iPad Pro (12.9-inch) (6th generation)/
    └── iPad Pro (11-inch) (4th generation)/
```

## 🎯 O Que o Teste Faz

O teste de UI (`ScreenshotTests.swift`) automaticamente:

1. ✅ Abre o app
2. ✅ Captura a tela inicial (HomeScreen)
3. ✅ Clica em botões disponíveis
4. ✅ Navega para tela de opções (se disponível)
5. ✅ Navega para tela de jogo (se disponível)
6. ✅ Interage com elementos da tela de jogo
7. ✅ Tenta alternar tema (dark/light)
8. ✅ Tenta alternar idioma
9. ✅ Captura diferentes estados do app

## ⚙️ Personalizar Configuração

### Adicionar/Remover Dispositivos

Edite o arquivo `fastlane/Snapfile`:

```ruby
devices([
  "iPhone 15 Pro Max",
  "iPhone 15 Pro",
  # Adicione ou remova dispositivos aqui
])
```

### Adicionar/Remover Idiomas

Edite o arquivo `fastlane/Snapfile`:

```ruby
languages([
  "pt-BR",
  "en-US",
  # Adicione ou remova idiomas aqui
])
```

### Modificar o Teste de UI

Edite o arquivo `ios/lucky_number_bingo_community_cliUITests/ScreenshotTests.swift` para:

- Adicionar mais interações
- Capturar telas específicas
- Testar fluxos diferentes

## 🔧 Solução de Problemas

### Erro: "Scheme not found"

Certifique-se de que o scheme está configurado como "Shared" no Xcode:
1. Abra o projeto no Xcode
2. Product > Scheme > Manage Schemes
3. Marque "Shared" para o scheme `lucky_number_bingo_community_cli`

### Erro: "Simulator not found"

Instale os simuladores necessários:
1. Abra Xcode
2. Xcode > Settings > Platforms
3. Baixe os simuladores iOS necessários

### Screenshots não estão capturando as telas corretas

Edite o arquivo `ScreenshotTests.swift` e ajuste os seletores de UI para corresponder aos elementos do seu app.

## 📝 Notas

- O processo pode demorar bastante tempo (15-30 minutos) dependendo do número de dispositivos e idiomas
- Certifique-se de que nenhum simulador está rodando antes de iniciar
- Os simuladores serão limpos antes de cada captura para garantir consistência
