import React from "react";
import "./App.css";
import Router from "./Router";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import storeCreator from "./store";
import Navigation from "./components/Navigation";

const { store, persistor } = storeCreator();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <Router>
            <Navigation />
          </Router>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
