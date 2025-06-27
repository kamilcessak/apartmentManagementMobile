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