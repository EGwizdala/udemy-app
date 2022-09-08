import React from 'react';
import './App.scss';

import Header from './components/Header';
import StoreProvider from './store/StoreProvider';

const App = () => {
  return (
    <StoreProvider>
     <Header />
    </StoreProvider>
    
  );
}

export default App;
