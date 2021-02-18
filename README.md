# オレンジ Scooters

A React Native application that displays set of vehicles in a Mapbox view.

## Features

- Navigation
    - login opens map
- Displays vehicles
- Detail of vehicles
- Error handling
    - Network error
    - Token error


## Installation (ios only)

1. Follow the [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup) steps for the desired environment.
2. Clone the repository: 

    ```
    git clone https://github.com/emohedano/OrenjiScooters.git
    ```
3. Install progect dependencies:

    ```
    cd OrenjiScooters
    npm install
    cd ios && pod install
    ```
4. Start Metro server:

    ```
    npm run start
    ```
5. Build the app:

    ```
    npm run ios
    ```
6. Application should be running in virtual device

## Additional Libraries
- **react-navigation**

    Used to simplify navigation across screens
- **react-native-config**
    
    Used to store private information in a `.env` file outside the repository
- **react-native-paper**
    
    Used to provide consistent UI components
- **react-native-paper**
    
    Used to provide consistent UI components