import React,{ useEffect, useState } from "react";
import axios from 'axios'
import { uid } from "uid";
import { auth, db ,storage} from "../firebase";
import { getStorage ,ref as ref_storage,uploadBytes,getDownloadURL } from "@firebase/storage";
import  { set,ref , onValue, remove, update,  } from "firebase/database";

import {  useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import { Container, FormControlLabel, FormLabel, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Radio ,RadioGroup} from "@mui/material";
import Services from "./services";
import { UploadFileOutlined } from "@mui/icons-material";
export default function AddLocalStore(){
    const navigate= useNavigate();
    const [imageUpload,setImageUpload] = useState(null);
    const [imageUrl,setImageUrl] =useState('');
    const [category,setCategory]=useState('false');
    const [addingInput,setaddingInput] =useState({
        name:'',
        content:'',
        coordinate:''
    });
    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            if(!user){
              navigate('/');
            }
        });
    },[]);
    const addLocalStore = (e)=>{
        e.preventDefault();
        if(addingInput.name === ''){
            alert('Please Input Local Store Name')
            return
        }else if(addingInput.content === ''){
            alert('Please Input Local Store Description')
            return
        }else if(category==''){
          alert('Please Choose Category')
            return
        }else if(addingInput.coordinate === ''){
          alert('Please Choose Category')
            return
        }
        
        const uidd= uid();
       var tempimage ='https://cdn.pixabay.com/photo/2020/11/20/17/15/local-store-5762254_960_720.png';
       var today = new Date(),
    time = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' +today.getHours() + ':' + today.getMinutes() ;
       if(imageUpload!=null){
        const storage = getStorage();
        const imageRef= ref_storage(storage,'localstore/'+imageUpload.name+uidd);
        uploadBytes(imageRef,imageUpload).then(()=> {
           getDownloadURL(imageRef).then((url)=>{
            console.log(url);
            set(ref(db,"/localstore/"+uidd ), {
           name: addingInput.name,
           storeId: uidd,
           category: category,
           coordinate: addingInput.coordinate,
           content: addingInput.content,
           ImgUrl: url,
           dateCreated: time
       })
            });
        }) 
       }else{
        set(ref(db,"/localstore/"+uidd ), {
          name: addingInput.name,
          storeId: uidd,
          category: category,
          coordinate: addingInput.coordinate,
          content: addingInput.content,
          ImgUrl: tempimage,
          dateCreated: time
      })
       }
       if(category=='restaurant'){
        alert('Restaurant Added');
       }else{
        alert('Store Added');
       }
      
        setaddingInput('');
        navigate('/home')
    };

    return(
        <Container>
        <Typography 
            variant="h6"
            component="h2"
            color="textSecondary"
            gutterBottom
        >
            Add Local Store
        </Typography>
        <form noValidate autoComplete="off" onSubmit={addLocalStore}>
            <TextField 
               onChange={(e)=> setaddingInput({...addingInput,name:e.target.value})}
                variant="outlined"   
                label="Store name"
                color="secondary"
                fullWidth
                required
                sx={{
                    marginTop:2,
                    marginBottom:2,
                    display:'block'
                }}
            />
               {/* <input type="file" onChange={(event)=>{setImageUpload(event.target.files[0])}}/> */}
               <Button variant="contained" component="label" endIcon={<UploadFileOutlined />}>
                Upload Picture <input type="file" hidden onChange={(event)=>{setImageUpload(event.target.files[0])} } />
              </Button>
              { imageUpload!==null ? <Typography variant="p" marginLeft={2}  >
              Uploaded
              </Typography> : null }

            <TextField 
                 onChange={(e)=> setaddingInput({...addingInput,content:e.target.value})}
                variant="outlined"   
                label="Description"
                color="secondary"
                fullWidth
                required
                multiline
                rows={4}
                sx={{
                    marginTop:2,
                    marginBottom:2,
                    display:'block'
                }}
            />
             <FormLabel>Category *</FormLabel>
            <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
                <FormControlLabel control={<Radio color="secondary"/>} value="store" label="Store" />
                <FormControlLabel control={<Radio color="secondary"/>} value="restaurant" label="Restaurant" />
            </RadioGroup>
            <TextField 
                 onChange={(e)=> setaddingInput({...addingInput,coordinate:e.target.value})}
                variant="outlined"   
                label="Latitude,Longtitute"
                color="secondary"
                fullWidth
                required
                multiline
                rows={4}
                sx={{
                    marginTop:2,
                    marginBottom:2,
                    display:'block'
                }}
            />
             <Button 
            type='submit'
            color='primary'
            variant="contained"
            startIcon={<SendIcon/>}
            sx={{marginBottom:2}}
            >
            Submit  
            </Button>
        </form>
      
       
        </Container>)
}

 