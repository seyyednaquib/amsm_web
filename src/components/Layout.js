import React from 'react'
import { AppBar, Drawer, ListItemIcon, Paper, Toolbar, Button} from '@mui/material'
import { Typography } from '@mui/material'
import './layout.css' 
import { display, spacing, styled } from '@mui/system';
import { List,ListItem ,ListItemText} from '@mui/material';
import { HomeRepairService, HomeRepairServiceOutlined, PersonAddAlt1Outlined,   } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import LogoutIcon from '@mui/icons-material/Logout';
import {auth} from "../firebase.js";
import { signOut } from "firebase/auth";
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';

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
        icon: <MarkChatUnreadOutlinedIcon color='secondary'/>,
        path: '/complaints'
    }
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
                    MANAGEMENT MENU
                </Typography>
            </div>
            <List>
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
            </List>
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
