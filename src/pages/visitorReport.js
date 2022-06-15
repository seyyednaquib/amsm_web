import React,{useState,useEffect} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import  { ref, onValue, orderByChild, getDatabase, get ,child} from "firebase/database";
import { Button, CardActionArea,  CardActions,  Container, Divider, FormControl, FormLabel, Grid ,InputLabel,MenuItem,Paper, Select} from "@mui/material";
import { remove ,update} from 'firebase/database';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Card,  IconButton, Typography } from '@mui/material'
import axios from 'axios'
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { async } from "@firebase/util";
import { uid } from "uid";
import SendIcon from '@mui/icons-material/Send';



export default function VisitorReport() {
  const navigate= useNavigate();
  const[visitors,setvisitors] =useState([]);
  const[resident,setResident] =useState([]);
  const[month,setMonth] = useState();
  var username ;
  useEffect(()=>{
      auth.onAuthStateChanged(user => {
          if(user){
              onValue(ref(db, '/visitors'),(snapshot) =>{
                  setvisitors([]);
                  const data = snapshot.val();
                  Object.values(data).map(visitors =>{return (
                      setvisitors((oldArray)=> [...oldArray,visitors]))
                  })
              })
              onValue(ref(db, '/residents'),(snapshot) =>{
                setResident([]);
                const data = snapshot.val();
                Object.values(data).map(resident =>{return (
                  setResident((oldArray)=> [...oldArray,resident]))
                })
            })
          }else if(!user){
              navigate('/');
          }
      });
  },[]);
  
  const generatePdf = (e) =>{
    //const doc = new jsPDF();
    const doc = new jsPDF("l", "pt", "a4"); // default values
    //doc.text(residentId, 20, 10);
    doc.setFont("helvetica", "bold");

    // font size
    doc.setFontSize(35);

    // title, centered around x
    // doc.text(text, x, y, flags, angle, align);
    doc.text(
      "VISITOR REPORT \nMELAWIS APARTMENT",
      150 * 2.83,
      20 * 2.83,
      null,
      null,
      "center"
    );

    // Image subtitle
    doc.setFontSize(11);
     doc.setFont("italic");
     var today = new Date();
     console.log('curr month ' + month)
     let tempmonth = (month <10) ? '0'+month :  month;
     let date = new Date(today.getFullYear(), tempmonth-1, 1);
     let longMonth = date.toLocaleString('en-us', { month: 'long' });
    doc.text(
      "MONTH: "+longMonth,
      32 * 2.83,
      60 * 2.83,
      null,
      null,
      "center"
    );
     doc.line(20, 120, 825, 120);
     doc.line(20, 122, 825, 122);
    // set back fontStyle to normal
    doc.setFont("normal");

    // Table
    const usersCol = ['Date Created',	'Visitor Name',	'Visitor IC/Passport',	'Unit No',	'Expected Entry Time',	'Entry Time'	,'Pre-Regis','Validate'];
    
    var today = new Date();
    
    let newmonth = (month <10) ? '0'+month :  month;

    const usersRows1 = visitors.sort((a, b) => a.dateCreated < b.dateCreated ? -1 : 1).filter(a => a.dateCreated.includes(today.getFullYear()+'-'+newmonth)).map(u => { 
        let residentName= '-';
        let unitNo= '-';
        resident.map(r=>{
            if(u.residentId==r.residentId){
                 residentName = r.rName 
                 unitNo = r.rUnit
            }
            console.log(residentName);
          })
        
          if(u.unit == null ){
            u.unit= unitNo
          }
          
          if(u.visitorPreRegis=='true'){
            u.visitorPreRegis ='X';
          } else{
            u.visitorPreRegis ='Y';
          }


      const row = [u.dateCreated, u.visitorName, u.visitorIcPassport, u.unit , u.expectedEntryTime ,u.EntryTime ,u.visitorPreRegis,u.visitorValidate];
       return row;
    });

    // const startY = 10 * 2.83;
    const startY = 70 * 2.83;
    doc.autoTable(usersCol, usersRows1, {
      // startY: 180 * 2.83,
      startY,
      theme: "grid",
      styles: {
        fontSize: 11
      }
    });

    // doc.text(
    //   "DOCUMENT GENERATED\nNO NEED FOR SIGNATURE",
    //   400 ,
    //   doc.autoTable.previous.finalY + 30 // we can use doc.autoTable.previous to get previous table data
    // );
    //doc.save('myPdf.pdf');
    const file = doc.output('blob');
    var string = doc.output('datauristring');
    var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
    var x = window.open();
    x.document.open();
    x.document.write(embed);
    x.document.close();
}
  const handleDelete = (id)=>{
    console.log(id);
      remove(ref(db, `/visitors/${id}`));
  }

    const getUsername =(residentId) =>{
    const dbRef = ref(getDatabase());
        get(child(dbRef, `residents/${residentId}/rName`)).then((snapshot) => {
          console.log(snapshot.val());
      })

};


 
  return  (
    <Container>
    <Typography 
        variant="h6"
        component="h2"
        color="textSecondary"
        gutterBottom
    >
        Visitor Report
        
    </Typography>
 
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
  <InputLabel id="demo-simple-select-label">Month</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={month}
    label="Month"
    onChange={(e) => setMonth(e.target.value)}
  >
    <MenuItem value={1}>January</MenuItem>
    <MenuItem value={2}>February</MenuItem>
    <MenuItem value={3}>March</MenuItem>
    <MenuItem value={4}>April</MenuItem>
    <MenuItem value={5}>May</MenuItem>
    <MenuItem value={6}>June</MenuItem>
    <MenuItem value={7}>July</MenuItem>
  </Select>
</FormControl>
         <Button 
        type='submit'
        color='primary'
        variant="contained"
        startIcon={<PictureAsPdfIcon/>}
        sx={{marginTop:2 , marginBottom:4}}
        onClick={()=>generatePdf(month)}
        >
        Download 
        
        </Button>
        <Divider sx={{ borderBottomWidth: 5,marginBottom:2 }} />

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight: 'bold' }}>Date Created</TableCell>
            <TableCell sx={{fontWeight: 'bold' }} align="left">Visitor Name</TableCell>
            <TableCell sx={{fontWeight: 'bold' }} align="left">Visitor IC/Passport</TableCell>
            {/* <TableCell sx={{fontWeight: 'bold' }} align="left">Resident Name</TableCell> */}
            <TableCell sx={{fontWeight: 'bold' }} align="left">Unit No</TableCell>
            <TableCell sx={{fontWeight: 'bold' }} align="left">Expected Entry Time</TableCell>
            <TableCell sx={{fontWeight: 'bold' }} align="left">Entry Time</TableCell>
            <TableCell sx={{fontWeight: 'bold' }}  align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visitors.sort((a, b) => a.dateCreated < b.dateCreated ? -1 : 1).map((row) => (
            <TableRow
              key={row.bookingId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.dateCreated}</TableCell>
              <TableCell align="left">{row.visitorName}</TableCell>
              <TableCell align="left">{row.visitorIcPassport}</TableCell>
              {/* {resident.map((r) => (
                (row.residentId==r.residentId) ?  <TableCell align="left">{r.rName}</TableCell>  : ''
              ))} */}
              {/* {(row.visitorPreRegis=="false") ?  <TableCell align="left">-</TableCell>  : ''} */}
              {resident.map((r) => (
                (row.residentId==r.residentId) ?  <TableCell align="left">{r.rUnit}</TableCell>  : ''
              ))}
                {(row.visitorPreRegis=="false") ?  <TableCell align="left">{row.unit}</TableCell>  : ''}
              <TableCell align="left">{row.expectedEntryTime}</TableCell>
              <TableCell align="left">{row.EntryTime}</TableCell>
              <TableCell align="left">
            
                 {(row.visitorValidate == '') ? 'VALIDATE' : 'VALIDATED'}
                
                  
                  
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
<div style={{  height:30 }}>  </div>
    </Container>);
 
}
