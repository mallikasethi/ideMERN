import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom"


import Ide from './pages/Ide/Ide'

function App() {
  return (
    <>
    <div className="header">
     <h1> Online Java/ Python IDE </h1>
      </div>
    <Router>
      <Route path="/" component={Ide} />
    </Router>
    </>
  );
}

export default App;
