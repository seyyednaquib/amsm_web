
import './App.css';
import Welcome from './components/Welcome';
import CreateNewService from './components/NewService';
import ServiceDetails from './components/serviceDetails';
import HomePage from './components/HomePage';
import React from "react";
import { createTheme , ThemeProvider} from '@mui/material/styles'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { purple } from '@mui/material/colors';

const theme = createTheme({
  palette:{
      primary:{
          main:'#fefefe'
      },
      secondary: purple
  },
  typography:{
    fontFamily:'Quicksand',
    fontWeightLight:400,
    fontWeightRegular:500,
    fontWeightMediumt:600,
    fontWeightBold:700,
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div >
       <Router>
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/homepage" element={<HomePage/>}/>
          <Route path="/createNewService" element={<CreateNewService/>}/>
          <Route path="/serviceDetails/:id" element={<ServiceDetails/>}/>
        </Routes>
    </Router>
    </div>
    </ThemeProvider>
  );
}

export default App;
