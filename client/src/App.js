import React from 'react'
import './App.css';
import appStore from "./business/dataStore";
import {Provider} from "react-redux";
import MainPage from "./MainPage";

function App() {
	return (
		<Provider store={appStore}>
			<MainPage/>
		</Provider>
	);
}

export default App;
