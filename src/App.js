
import './App.css';
import Welcome from './pages/Welcome';
import ServicePage from './pages/servicePage';
import ServiceDetails from './pages/serviceDetails';
import HomePage from './pages/HomePage';
import Services from './pages/services';
import PermanentDrawerLeft from'./components/test';
import React from "react";
import { createTheme , ThemeProvider} from '@mui/material/styles'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { purple } from '@mui/material/colors';
import AddService from './pages/addService';
import Layout from './components/Layout';
import { spacing } from '@mui/system';

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
       <Routes >
          <Route path="/" element={<Welcome/>}/>
       </Routes>
       <Layout>
        <Routes>
          <Route path="/homepage" element={<HomePage/>}/>
          <Route path="/servicePage" element={<ServicePage/>}/>
          <Route path="/services" element={<Services/>}/>
          <Route path="/addService" element={<AddService/>}/>
          <Route path="/serviceDetails/:id" element={<ServiceDetails/>}/>
          <Route path="/test" element={<PermanentDrawerLeft/>}/>
        </Routes>
       </Layout>
    </Router>
    </div>
    </ThemeProvider>
  );
}

export default App;
