import './widget.css'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import InfoIcon from '@mui/icons-material/Info';
import EventIcon from '@mui/icons-material/Event';
import React from 'react'
import { useEffect , useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../../firebase";
import  { ref, onValue, orderByChild } from "firebase/database";
import { Bar } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
function Widget({type}) {
    const navigate= useNavigate();
    const[resident,setResident] =useState([]);
    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            if(user){
                onValue(ref(db, '/residents'),(snapshot) =>{
                  setResident([]);
                  const data = snapshot.val();
                  Object.values(data).map(bookedService =>{return (
                    setResident((oldArray)=> [...oldArray,bookedService]))
                  })
              })
                console.log(resident);
            }else if(!user){
                navigate('/');
            }
        });
    },[]);
    let data;

    // temporary amount of money
    const amount = Math.floor(Math.random() * 100);
    const diff = Math.floor(Math.random() * 100);

    switch (type) {
        case 'users':
            data = {
                title: 'USERS',
                isMoney: false,
                link: 'See All Users',
                icon: (
                    <PersonOutlinedIcon className='icon' style={{
                        color: 'crimson', 
                        backgroundColor: 'rgba(255, 0, 0, 0.2)'}} />
                ),
            }
            break;
        case 'announcement':
            data = {
                title: 'Announcement Expand',
                isMoney: false,
                link: '',
                icon: (
                    <InfoIcon className='icon' style={{
                        color: 'goldenrod', 
                        backgroundColor: 'rgba(218, 65, 32, 0.2)'}} />
                ),
            }
            break;
        case 'event':
            data = {
                title: 'Event Expand',
                isMoney: true,
                link: '',
                icon: (
                    <EventIcon className='icon'  style={{
                        color: 'green', 
                        backgroundColor: 'rgba(0, 128, 0, 0.2)'}} />
                ),
            }
            break;
      
        default:
            break;
    }



  return (
    <div className='widget'>
        <div className='left'>
            <span className='title'>{data.title}</span>
            <span className='counter'>  {(type=='users') ? resident.length: amount}</span>
            <span className='link'>{data.link}</span>
        </div>
        <div className='right'>
            <div className="percentage positive">
                <KeyboardArrowUpIcon />
                {diff}%
            </div>
                {data.icon}
        </div>
    </div>
  )
}

export default Widget
