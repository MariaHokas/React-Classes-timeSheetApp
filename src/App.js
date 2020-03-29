import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tuntiraportti from './Tuntiraportti';
import NWCustomerFetch from './NWCustomerFetch';
import Tunnit from './tunnit';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      {/* <Tuntiraportti  /> */}
      <Tunnit />
      {/* <NWCustomerFetch /> */}
      </header>
     
    </div>
  );
}

export default App;
