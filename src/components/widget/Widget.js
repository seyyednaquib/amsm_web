import './widget.css'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

import React from 'react'
import { Bar } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
function Widget({type}) {
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
                link: 'See All Oders',
                icon: (
                    <ShoppingCartOutlinedIcon className='icon' style={{
                        color: 'goldenrod', 
                        backgroundColor: 'rgba(218, 65, 32, 0.2)'}} />
                ),
            }
            break;
        case 'event':
            data = {
                title: 'Event Expand',
                isMoney: true,
                link: 'View Earnings',
                icon: (
                    <MonetizationOnOutlinedIcon className='icon'  style={{
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
            <span className='counter'> {amount}</span>
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
