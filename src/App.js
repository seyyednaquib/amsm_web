
import './App.css';
import Welcome from './components/Welcome';
import CreateNewService from './components/NewService';
import HomePage from './components/HomePage';
import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <div >
       <Router>
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/homepage" element={<HomePage/>}/>
          <Route path="/createNewService" element={<CreateNewService/>}/>
        </Routes>
    </Router>
    </div>
   
  );
}

export default App;
