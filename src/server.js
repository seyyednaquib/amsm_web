import express from 'express';
const app=express();
app.use('/api/notification',require('./src/pages/notification'));
const PORT= process.env.PORT || 3000;

app.listen(PORT,()=>console.log('server started'));