import React from 'react';
import { HashRouter as Router } from "react-router-dom";
import './App.scss';
import AsideMenu from './components/AsideMenu';
import Content from "./components/Content";
import Header from './components/Header';
import StoreProvider from './store/StoreProvider';


const App = () => {
  return (
    <StoreProvider>
      <Header />
      <Router>
      <div className="content-wrapper">
          <AsideMenu />
          <Content/>
      </div>
      </Router>
    </StoreProvider>
    
  );
}

export default App;
