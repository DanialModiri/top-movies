import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom'
import Header from './components/Layout/Header';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header></Header>
      </div>
    </HashRouter>

  );
}

export default App;
