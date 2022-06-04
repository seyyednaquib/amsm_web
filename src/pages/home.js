import React, { useState } from "react";
import './home.css';
import Widget from '../components/widget/Widget'

const Home = () => {

  return (<div><div className='widgets'>
  <Widget type='users' />
  <Widget type='announcement' />
  <Widget type='event' />
</div></div>)
     
}
 
export default Home;