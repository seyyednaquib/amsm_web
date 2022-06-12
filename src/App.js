
import './App.css';
import Welcome from './pages/Welcome';
import BookedServicePage from './pages/bookedService';
import Services from './pages/services';
import Complaints from './pages/complaints';
import Complaint2 from './pages/complaints_table';
import WorkPermit from './pages/workpermit';
import WorkPermitDetails from './pages/workPermitDetails';
import AddResident from './pages/addResident';
import PermanentDrawerLeft from'./components/test';
import PostForm from './components/postForm';
import AddAnnouncement from './pages/addAnnouncement';
import { Reminder } from './pages/reminder';
import React from "react";
import Home from './pages/home';
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
import ComplaintDetails from './pages/complaintDetails';
import AddLocalStore from './pages/addLocalStore';

const theme = createTheme({
  palette:{
      primary:{
          main:'#fefefe',
          dark: '#002884',
          grey: '#DDDDDD',
          darkgrey: '#A3A3A3'
      },
      secondary: purple,
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
          <Route path="/home" element={<Home/>}/>
          <Route path="/notification" element={<PostForm/>}/>
          <Route path="/addAnnouncement" element={<AddAnnouncement/>}/>
          <Route path="/bookedService" element={<BookedServicePage/>}/>
          <Route path="/services" element={<Services/>}/>
          <Route path='reminder' element={<Reminder/>}/>
          <Route path='/addLocalStore' element={<AddLocalStore/>}/>
          <Route path="/addService" element={<AddService/>}/>
          <Route path="/complaintDetails/:id" element={<ComplaintDetails/>}/>
          <Route path="/addResident" element={<AddResident/>}/>
          <Route path="/complaints" element={<Complaints></Complaints>}/>
          <Route path="/workpermit" element={<WorkPermit></WorkPermit>}/>
          <Route path="/workPermitDetails" element={<WorkPermitDetails></WorkPermitDetails>}/>
          <Route path="/test" element={<PermanentDrawerLeft/>}/>

        </Routes>
       </Layout>
    </Router>
    </div>
    </ThemeProvider>
  );
}

export default App;
