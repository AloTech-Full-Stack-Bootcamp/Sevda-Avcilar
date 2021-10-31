const http=require('http');

//Creating a server
const server = http.createServer((req,res)=>{
    //Routing to Index page
    if(req.url==='/index'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('<h1>Burasi Index Sayfasidir.</h1>');
    }
    //Routing to Hakkimda page
    else if(req.url==='hakkimda'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('<h1>Burasi Hakkimda Sayfasidir.</h1>');
    }
    //Routing to Iletisim page
    else if(req.url==='iletisim'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('<h1>Burasi Iletisim Sayfasidir.</h1>');
    }
})

//Listening the 5000 port
server.listen(5000,()=>console.log('Çalışıyor.'));