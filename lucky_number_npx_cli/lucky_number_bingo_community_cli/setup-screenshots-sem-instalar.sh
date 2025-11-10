#!/bin/bash

echo "🚀 Verificando ambiente para geração de screenshots..."
echo ""

# Verificar se Fastlane está instalado
if ! command -v fastlane &> /dev/null; then
    echo "❌ Fastlane não está instalado."
    echo ""
    echo "Por favor, instale o Fastlane primeiro:"
    echo ""
    echo "  OPÇÃO 1 (Recomendado - Homebrew):"
    echo "    brew install fastlane"
    echo ""
    echo "  OPÇÃO 2 (RubyGems - instala muitas dependências extras):"
    echo "    sudo gem install fastlane -NV"
    echo ""
    exit 1
else
    echo "✅ Fastlane está instalado"
    fastlane --version
fi

# Verificar se CocoaPods está instalado
if ! command -v pod &> /dev/null; then
    echo "❌ CocoaPods não está instalado."
    echo ""
    echo "Por favor, instale o CocoaPods:"
    echo "  sudo gem install cocoapods"
    echo ""
    exit 1
else
    echo "✅ CocoaPods está instalado"
fi

# Instalar pods
echo ""
echo "📦 Instalando dependências do iOS..."
cd ios
pod install
cd ..

echo ""
echo "✅ Configuração concluída!"
echo ""
echo "Para gerar screenshots, execute:"
echo "  npm run screenshots"
echo ""
echo "Os screenshots serão salvos em: fastlane/screenshots/"
