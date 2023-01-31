/* eslint-disable no-empty-pattern */
import AppContextProvider from './Context/AppContext';
import "./App.css";
import PopupContextProvider from "./Context/PopupContext/PopupContext";
import Layout from './layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import { useState, createContext } from 'react';
import { IAppContext } from './App.types';

export const AppContext = createContext<IAppContext>({
  appState: {},
  setAppState: ({ }) => { },
});

function App() {
  const [appState, setAppState] = useState({
    page: "Login",
    userDetails: { id: "" },
  });
  const setAppStateWraper = (data: any) => setAppState(data);

  return (
    <BrowserRouter>
      <AppContextProvider>
        <AppContext.Provider
          value={{ appState: appState, setAppState: setAppStateWraper }}>
          <PopupContextProvider>
            <Layout />
          </PopupContextProvider>
        </AppContext.Provider>
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
