import React, { useEffect, useState } from 'react'
import { AppBar, Drawer, ListItemIcon, Paper, Toolbar, Button} from '@mui/material'
import { Typography } from '@mui/material'
import './layout.css' 
import { display, spacing, styled } from '@mui/system';
import { List,ListItem ,ListItemText} from '@mui/material';
import { AnnouncementOutlined, HomeRepairService, HomeRepairServiceOutlined, PersonAddAlt1Outlined,   } from '@mui/icons-material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import LogoutIcon from '@mui/icons-material/Logout';
import {auth} from "../firebase.js";
import { signOut } from "firebase/auth";
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
const MyComponent = styled('div')({
  display: 'flex',
});
const Page = styled('div')({
    background:'#f9f9f9',
    width: '100%',
    marginTop: 64
  });
const drawerWidth = 240;



export default function Layout({children}) {
    const location = useLocation(); 
    const navigate = useNavigate();
    const[isSecurity,setIsSecurity] =useState(false);
    useEffect(()=>{
      auth.onAuthStateChanged((user)=>{
          if(user ){
              if(user.email=='security@melawis.my'){
                setIsSecurity(true);
              }
          }
      });
  },[]);
    if(location.pathname != '/') { 






    const handleSignOut = ()=>{
        signOut(auth).then(()=> {navigate('/')}).catch((err)=> {alert(err.message);});
    }


    const menuItems=[
       {
            text: 'Add Resident',
            icon: <PersonAddAlt1Outlined color='secondary'/>,
            path: '/addResident'
        },
        {
          text: 'Announcement',
          icon: <MarkChatUnreadOutlinedIcon color='secondary'/>,
          path: '/addAnnouncement'
      },
        {
            text: 'Services',
            icon: <HomeRepairServiceOutlined color='secondary'/>,
            path: '/addService'
        },
        {
            text: 'Booked Service',
            icon: <HomeRepairServiceOutlined color='secondary'/>,
            path: '/bookedService'
        },
      
      {
        text: 'Complaints',
        icon: <AnnouncementOutlined color='secondary'/>,
        path: '/complaints'
    },
    {
      text: 'Local Store',
      icon: <StorefrontIcon color='secondary'/>,
      path: '/addLocalStore'
  },
  {
    text: 'Work Permit',
    icon: <ReceiptLongIcon color='secondary'/>,
    path: '/workpermit'
}
    ]

    const menuItems2=[
    
       {
           text: 'Validate Visitor',
           icon: <HowToRegIcon color='secondary'/>,
           path: '/security'
       },
     {
       text: 'New Visitor',
       icon: <PersonAddAlt1Icon color='secondary'/>,
       path: '/newVisitor'
   },
   ]
  return (
    <MyComponent>
        <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
        <Toolbar >
          <Typography variant="h6"  sx={{flexGrow:1}}>
            Today is the {format(new Date(),'do MMMM Y')}
          </Typography >
          <Button variant="outlined" endIcon={<LogoutIcon />} color='secondary' onClick={handleSignOut}>
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
        <Drawer 
        className='drawer' 
        variant='permanent' 
        anchor='left'
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
            <div>
            
                <Typography variant='h5' sx={{padding:2}}>
                {(isSecurity==true) ? 'SECURITY MENU' : 'MANAGEMENT MENU'} 
                </Typography>
            </div>
            {(isSecurity==true) ?  <List>
           
           {menuItems2.map(item=>(
               <ListItem 
                 button
                 key={item.text}
                 onClick={()=> navigate(item.path)}
                 sx= { location.pathname == item.path ? {background: '#f4f4f4'} : {background: 'white'}}
               >
                   <ListItemIcon>{item.icon}</ListItemIcon>
                   <ListItemText primary={item.text}/>
               </ListItem>
           ))}
         </List> :  <List>
  
           {menuItems.map(item=>(
               <ListItem 
                 button
                 key={item.text}
                 onClick={()=> navigate(item.path)}
                 sx= { location.pathname == item.path ? {background: '#f4f4f4'} : {background: 'white'}}
               >
                   <ListItemIcon>{item.icon}</ListItemIcon>
                   <ListItemText primary={item.text}/>
               </ListItem>
           ))}
         </List>} 
           
        </Drawer>
      
        <Page>
            {children}
        </Page>
    </MyComponent>
  )
}
else{
    return;
}
}
