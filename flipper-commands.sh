#!/bin/bash

# 🐬 Flipper - Comandos Úteis
# Este arquivo contém comandos úteis para trabalhar com o Flipper

echo "🐬 Flipper - Comandos Úteis"
echo ""

# Função para mostrar menu
show_menu() {
    echo "Escolha uma opção:"
    echo ""
    echo "1. 🚀 Iniciar app com Flipper (iOS)"
    echo "2. 🤖 Iniciar app com Flipper (Android)"
    echo "3. 📱 Abrir apenas o Flipper"
    echo "4. 🔄 Reiniciar Metro com cache limpo"
    echo "5. 🧹 Limpar cache iOS e reinstalar pods"
    echo "6. 📊 Ver logs do iOS"
    echo "7. 📊 Ver logs do Android"
    echo "8. 🔍 Verificar dispositivos Android (ADB)"
    echo "9. 🔧 Reiniciar ADB"
    echo "10. 📖 Abrir documentação do Flipper"
    echo "11. ❌ Sair"
    echo ""
    read -p "Digite o número da opção: " choice
    
    case $choice in
        1)
            echo "🍎 Iniciando app iOS com Flipper..."
            open -a Flipper
            sleep 2
            npm run ios
            ;;
        2)
            echo "🤖 Iniciando app Android com Flipper..."
            open -a Flipper
            sleep 2
            npm run android
            ;;
        3)
            echo "📱 Abrindo Flipper..."
            open -a Flipper
            ;;
        4)
            echo "🔄 Reiniciando Metro com cache limpo..."
            npm start -- --reset-cache
            ;;
        5)
            echo "🧹 Limpando cache iOS..."
            cd ios
            rm -rf Pods Podfile.lock
            pod install
            cd ..
            echo "✅ Cache limpo e pods reinstalados!"
            ;;
        6)
            echo "📊 Mostrando logs do iOS..."
            npx react-native log-ios
            ;;
        7)
            echo "📊 Mostrando logs do Android..."
            npx react-native log-android
            ;;
        8)
            echo "🔍 Verificando dispositivos Android..."
            adb devices
            ;;
        9)
            echo "🔧 Reiniciando ADB..."
            adb kill-server
            adb start-server
            echo "✅ ADB reiniciado!"
            ;;
        10)
            echo "📖 Abrindo documentação..."
            echo ""
            echo "Documentação disponível:"
            echo "  - FLIPPER_GUIDE.md (Guia completo)"
            echo "  - FLIPPER_QUICK_REFERENCE.md (Referência rápida)"
            echo "  - FLIPPER_EXAMPLES.md (Exemplos práticos)"
            echo "  - FLIPPER_DEBUG_CHECKLIST.md (Checklist de debug)"
            echo "  - FLIPPER_README.txt (Resumo visual)"
            echo ""
            read -p "Deseja abrir o guia completo? (s/n): " open_guide
            if [ "$open_guide" = "s" ] || [ "$open_guide" = "S" ]; then
                open FLIPPER_GUIDE.md
            fi
            ;;
        11)
            echo "👋 Até logo!"
            exit 0
            ;;
        *)
            echo "❌ Opção inválida!"
            ;;
    esac
    
    echo ""
    read -p "Pressione ENTER para voltar ao menu..."
    show_menu
}

# Mostrar menu
show_menu
