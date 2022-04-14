import React, { useEffect, useState }  from "react";

import './welcome.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth,db} from "../firebase.js";
import  {set, ref  } from "firebase/database";
import { useNavigate } from "react-router-dom";
import LogoPNG from "../assets/logo-aspiras.png";
export default function Welcome(){
    const navigate = useNavigate();
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const [isRegistering,setIsRegistering] = useState(false);
    const [registerInput,setRegisterInput] =useState({
        name:'',
        email:'',
        confirmEmail:'',
        password:'',
        confrimPassword:''
    });

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                navigate('/createNewService');
            }
        });
    })

    const handleEmailChange =(e) =>{
        setEmail(e.target.value);
    }
    const handlePasswordChange =(e) =>{
        setPassword(e.target.value);
    }
    const handleSignIn =() =>{
        signInWithEmailAndPassword(auth,email,password).then(()=> {navigate('/homepage')}).catch((err) => alert(err.message));
    }
    const handleRegister=() =>{
        if(registerInput.email !== registerInput.confirmEmail ){
            alert('Please Confirm that email are the same')
            return
        }else if(registerInput.password !== registerInput.confrimPassword){
            alert('Please Confirm that password are the same')
            return
        }
        createUserWithEmailAndPassword(auth,registerInput.email,registerInput.password).then(()=> { 
             console.log(auth.currentUser.uid);
            set(ref(db,"/users/"+auth.currentUser.uid ), {
                email: registerInput.email,
                name: registerInput.name,
            }); 
            navigate('/homepage');}).catch((err=> alert(err.message)));
        
    }

    return(<div className="welcome">
      
        <h1>Management Melawis Apartment</h1>
        <img src={LogoPNG} className="logopng" alt="logo aspiras"/>
        <div className="login-register-container">
  
         {isRegistering ? <>   
            <input type="text"  placeholder="FullName" value={registerInput.name} onChange={(e)=> setRegisterInput({...registerInput,name:e.target.value})}/>
            <input type="email"  placeholder="Email" value={registerInput.email} onChange={(e)=> setRegisterInput({...registerInput,email:e.target.value})}/>
            <input type="email"  placeholder="Confirm Email" value={registerInput.confirmEmail} onChange={(e)=> setRegisterInput({...registerInput,confirmEmail:e.target.value})}/>
            <input type="password" placeholder="Password" value={registerInput.password} onChange={(e)=> setRegisterInput({...registerInput,password:e.target.value})}/>
            <input type="password" placeholder="Confrim Password " value={registerInput.confrimPassword} onChange={(e)=> setRegisterInput({...registerInput,confrimPassword:e.target.value})}/>
            <button onClick={handleRegister}>Register</button>
            <button onClick={()=>setIsRegistering(false)}>Go Back</button></>
            
            :
            
            <>   <input type="email" onChange={handleEmailChange} value={email}/>
            <input type="password" onChange={handlePasswordChange} value={password}/>
            <button className="sign-in-register-button" onClick={handleSignIn}>Sign In</button>
            <button className="create-account-button " onClick={()=>setIsRegistering(true)}>Create an account</button></>}
        </div>
    </div>)
}