# ApartmentManagement Mobile 👋

This is an Expo project created with create-expo-app by Kamil Cessak.
Application base on Feature-based Clean Architecture.

## Used technologies and main libraries

1. Used technologies

   ```bash
   "react": "19.0.0",
   "react-native": "0.79.3",
   "expo": "53.0.0",
   "typescript": "5.8.3"
   ```

2. Used libraries

   ```bash
   "@react-navigation/native": "7.0.14", // For navigation
   "@tanstack/react-query": "5.74.4", // For handling queries
   "axios": "1.8.4", // For CRUD requests
   "react-native-paper": "5.13.1", // For material components design
   "styled-components": "6.1.16", // For custom styling
   "jest": "29.7.0", // For unit tests
   "@testing-library/react-native": "13.2.0", // For rendering tests
   ```

## Run project instructions

1. Install dependencies

   ```bash
   yarn
   ```

2. Install native packages

   ```bash
   yarn ios
   ```

   or
   
   ```bash
   yarn android
   ```

3. Run project on expo:go

4. Run tests (optionally)

   ```bash
   yarn test
   ```


In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
