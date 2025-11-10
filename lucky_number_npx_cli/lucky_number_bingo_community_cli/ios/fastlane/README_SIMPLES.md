# 📸 Screenshots Automáticos - Guia Rápido

## ⚡ Instalação Rápida

```bash
# 1. Instalar Fastlane (escolha uma opção)
brew install fastlane                    # RECOMENDADO - rápido
# OU
sudo gem install fastlane -NV            # Instala muitas dependências extras

# 2. Instalar pods
cd ios && pod install && cd ..
```

## 🎯 Gerar Screenshots

```bash
npm run screenshots
```

Os screenshots serão salvos em `fastlane/screenshots/`

## 📱 O que será gerado?

- **6 dispositivos**: iPhone 15 Pro Max, iPhone 15 Pro, iPhone 15, iPhone SE, iPad Pro 12.9", iPad Pro 11"
- **2 idiomas**: Português (pt-BR) e Inglês (en-US)
- **Múltiplas telas**: Home, Options, Game, e diferentes estados do app

## ⚠️ Sobre as dependências do Fastlane

Se você instalou via `gem install fastlane`, ele baixa muitas dependências relacionadas a:
- Google Play (Android) - não necessário para iOS
- AWS S3 - não necessário para screenshots locais
- Outras ferramentas de CI/CD

**Essas dependências NÃO são necessárias para apenas gerar screenshots localmente.**

Para evitar isso, use `brew install fastlane` que instala apenas o necessário.

## 📤 Upload para App Store (Opcional)

Depois de gerar os screenshots:

```bash
cd ios
fastlane upload_screenshots
```

Você precisará configurar suas credenciais no arquivo `fastlane/Appfile`.

## 🔧 Configuração

- `fastlane/Fastfile` - Comandos principais
- `fastlane/Snapfile` - Dispositivos e idiomas
- `fastlane/Appfile` - ID do app (6755083794)
- `ios/lucky_number_bingo_community_cliUITests/ScreenshotTests.swift` - Teste de UI
