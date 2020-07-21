import React from "react";
import RootStackNavigator from './src/navigation/router/RootStackNavigator';
import { Provider, Portal } from "react-native-paper"

function App() {
  return(
    <Provider>
      <Portal>
        <RootStackNavigator />
      </Portal>
    </Provider>
  );
}

export default App;