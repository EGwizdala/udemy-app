import React from 'react';
import { BrowserRouter } from "react-router-dom";
import './App.scss';
import AsideMenu from './components/AsideMenu';
import Content from "./components/Content";
import Header from './components/Header';
import StoreProvider from './store/StoreProvider';


const App = () => {
  return (
    <StoreProvider>
      <Header />
      <BrowserRouter>
      <div className="content-wrapper">
          <AsideMenu />
          <Content/>
      </div>
      </BrowserRouter>
    </StoreProvider>
    
  );
}

export default App;
