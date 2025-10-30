# Projeto criado com o comando abaixo:

npx @react-native-community/cli@latest init MyApp

# rode o app com o comando abaixo:

npm start

npm run android

npm run ios

* Crie um release de um AAB ( Android App Bundle )

npx react-native build-android --mode=release

se gerar um APK ou AAB pelo Android Studio, não funciona pois não embute o serviço/servidor do react

npx react-native build-android --mode=debug

# Gerar um APK

npx react-native build-android --mode=release --output-type=apk

# Rodar APK com arquivos js embutidos

npx react-native run-android --variant=release

# Gerar arquivo APK
cd android && ./gradlew assembleRelease

# Gerar arquivo AAB
1. Primeiro, crie a pasta de assets se ela não existir
mkdir -p android/app/src/main/assets

2. Agora, na raiz do seu projeto React Native, execute o comando para gerar o bundle
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

3. gere o arquivo aab
cd android && ./gradlew bundleRelease

-----------

# Documentação padrão do React Native

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).
