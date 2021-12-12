import React, { useState } from 'react';
import './App.scss';
import { Button } from './components/button/button';
// import react-router-dom 
import { Index } from './pages/index/index';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";



function App() {
  
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Index />}></Route>
      <Route path="/settings" element={<p>Settings</p>} />
    </Routes>
  </Router>
  );
}

export default App;

/*
  <div className="App">
      <h1>DON'T <span>DOX</span> ME</h1>
      <p>Status</p>
      <h2 style={{ color: enabled ? 'lime' : 'red' }}>{enabled ? 'Enabled' : 'Disabled'}</h2>
      <Button label="toggle" onClick={() => setEnabled(!enabled)}></Button>
    </div>


*/