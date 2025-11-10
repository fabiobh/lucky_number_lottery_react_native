#!/bin/bash

echo "🚀 Configurando ambiente para geração de screenshots..."

# Verificar se Fastlane está instalado
if ! command -v fastlane &> /dev/null; then
    echo "⚠️  Fastlane não está instalado."
    echo ""
    echo "OPÇÃO 1 (Recomendado - Mais rápido):"
    echo "  brew install fastlane"
    echo ""
    echo "OPÇÃO 2 (Usando RubyGems - instala muitas dependências):"
    echo "  sudo gem install fastlane -NV"
    echo ""
    exit 1
else
    echo "✅ Fastlane já está instalado"
fi

# Instalar pods
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
