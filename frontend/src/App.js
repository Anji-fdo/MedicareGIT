import './App.css';
import React, { Component }  from 'react';
import Header from './Components/Header';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AddPatient from './Components/AddPatient';
import AddPatients from './Components/AddPatients';
import Tests from './Components/Tests';


function App() {
  return (
    <Router>
      
      <div>

      
      
        <Routes> 
          <Route path="/add" exact element={<AddPatient/>} />
          <Route path="/register" exact element={<AddPatients/>} />
          <Route path="/create" exact element={<Tests/>} />
        </Routes>
        
      </div>
      
    </Router>
  );
}

export default App;
