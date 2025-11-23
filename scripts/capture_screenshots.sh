#!/bin/bash

# Script para capturar screenshots do app iOS

set -e

echo "🚀 Iniciando captura de screenshots..."

# Configurações
SCHEME="lucky_number_bingo_community_cli"
DEVICE="iPhone 15 Pro"
OUTPUT_DIR="ios/fastlane/screenshots"

# Criar diretório de saída
mkdir -p "$OUTPUT_DIR"

# Limpar screenshots anteriores
rm -rf "$OUTPUT_DIR"/*

echo "📱 Dispositivo: $DEVICE"
echo "📂 Diretório de saída: $OUTPUT_DIR"

# Obter o UUID do simulador
DEVICE_UUID=$(xcrun simctl list devices available | grep "$DEVICE" | grep -v "unavailable" | head -1 | grep -oE '\([A-F0-9-]+\)' | tr -d '()')

if [ -z "$DEVICE_UUID" ]; then
    echo "❌ Erro: Não foi possível encontrar o simulador $DEVICE"
    echo "Simuladores disponíveis:"
    xcrun simctl list devices available | grep "iPhone"
    exit 1
fi

echo "🔧 UUID do simulador: $DEVICE_UUID"

# Iniciar o simulador
echo "🔄 Iniciando simulador..."
xcrun simctl boot "$DEVICE_UUID" 2>/dev/null || true
sleep 3

# Abrir o Simulator.app
open -a Simulator

# Aguardar o simulador estar pronto
echo "⏳ Aguardando simulador ficar pronto..."
sleep 5

# Build e instalar o app em modo Release (não precisa do Metro)
echo "🔨 Compilando e instalando o app (modo Release)..."
xcodebuild -workspace ios/lucky_number_bingo_community_cli.xcworkspace \
    -scheme "$SCHEME" \
    -configuration Release \
    -destination "id=$DEVICE_UUID" \
    -derivedDataPath ios/build \
    build

# Encontrar o app bundle
APP_BUNDLE=$(find ios/build/Build/Products/Release-iphonesimulator -name "*.app" -type d | head -1)

if [ -z "$APP_BUNDLE" ]; then
    echo "❌ Erro: Não foi possível encontrar o app bundle"
    exit 1
fi

echo "📦 App bundle: $APP_BUNDLE"

# Instalar o app
echo "📲 Instalando app no simulador..."
xcrun simctl install "$DEVICE_UUID" "$APP_BUNDLE"

# Obter o bundle identifier
BUNDLE_ID=$(/usr/libexec/PlistBuddy -c "Print :CFBundleIdentifier" "$APP_BUNDLE/Info.plist")
echo "🆔 Bundle ID: $BUNDLE_ID"

# Lançar o app
echo "🚀 Lançando app..."
xcrun simctl launch "$DEVICE_UUID" "$BUNDLE_ID"

# Aguardar o app carregar
echo "⏳ Aguardando app carregar..."
sleep 5

# Capturar screenshots
echo "📸 Capturando screenshots..."

# Screenshot 1: Tela inicial
xcrun simctl io "$DEVICE_UUID" screenshot "$OUTPUT_DIR/01-HomeScreen.png"
echo "✅ Screenshot 1 capturado"
sleep 2

# Screenshot 2: Após alguns segundos
xcrun simctl io "$DEVICE_UUID" screenshot "$OUTPUT_DIR/02-SecondView.png"
echo "✅ Screenshot 2 capturado"
sleep 2

# Screenshot 3
xcrun simctl io "$DEVICE_UUID" screenshot "$OUTPUT_DIR/03-ThirdView.png"
echo "✅ Screenshot 3 capturado"

echo ""
echo "✅ Screenshots capturados com sucesso!"
echo "📂 Localização: $OUTPUT_DIR"
echo ""
ls -lh "$OUTPUT_DIR"
