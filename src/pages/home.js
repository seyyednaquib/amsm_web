import React, { useState } from "react";
import './home.css';
import Widget from '../components/widget/Widget'
import { getAnalytics, logEvent } from "firebase/analytics";


const Home = () => {
  const analytics = getAnalytics();
logEvent(analytics, 'notification_received');

  return (<div><div className='widgets'>
  <Widget type='users' />
  <Widget type='announcement' />
  <Widget type='event' />
</div></div>)
     
}
 
export default Home;