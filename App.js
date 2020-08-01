import React from "react";
import RootStackNavigator from "./src/navigation/router/RootStackNavigator";
import { Provider, Portal } from "react-native-paper";
import { RootToaster } from "react-native-root-toaster";

function App() {
	return (
		<Provider>
			<Portal>
				<RootStackNavigator />
				<RootToaster
					defaultMessage={"Default message"}
					defaultDuration={5000}
				/>
			</Portal>
		</Provider>
	);
}
//#1E88E5
export default App;
