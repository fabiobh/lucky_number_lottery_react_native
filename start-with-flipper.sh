#!/bin/bash

# Script para iniciar o app com Flipper
# Uso: ./start-with-flipper.sh [ios|android]

echo "🐬 Iniciando app com Flipper..."
echo ""

# Abrir Flipper
echo "📱 Abrindo Flipper Desktop..."
open -a Flipper

# Aguardar um pouco para o Flipper iniciar
sleep 2

# Verificar qual plataforma foi solicitada
PLATFORM=${1:-ios}

if [ "$PLATFORM" = "ios" ]; then
    echo "🍎 Iniciando app iOS..."
    echo ""
    npm run ios
elif [ "$PLATFORM" = "android" ]; then
    echo "🤖 Iniciando app Android..."
    echo ""
    npm run android
else
    echo "❌ Plataforma inválida. Use: ./start-with-flipper.sh [ios|android]"
    exit 1
fi
