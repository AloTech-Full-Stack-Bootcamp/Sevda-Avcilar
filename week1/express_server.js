const express=require('express');
const app=express();

//Routing to Index page
app.get('/index',(req,res)=>{
    res.status(200).send('Burası Index Sayfasıdır.');
})

//Routing to Hakkimda page
app.get('/hakkimda',(req,res)=>{
    res.status(200).send('Burası Hakkımda Sayfasıdır.');
})

//Routing to Iletisim page
app.get('/iletisim',(req,res)=>{
    res.status(200).send('<h1>Burası Iletişim Sayfasıdır.</h1>');
    //Html
})

//Listening the 5000 port
app.listen(5000,()=>{
    console.log('Port opened.');
})

