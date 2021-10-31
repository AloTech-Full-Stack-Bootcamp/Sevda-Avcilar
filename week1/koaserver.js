const koa = require('koa');
const router=require('koa-router')
const app=new koa();
const rout=new router();


//Logger function
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('Response');
    console.log('Method:'+ctx.method+' Url:'+ ctx.url+' Ms:'+rt);
  });

//Response time function
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('Response', ms);
});

//Routing to Index page
rout.get('/index', (ctx) => {
  ctx.body='<h1>Burası index sayfasidir.</h1>'
});

//Routing to Hakkimda page
rout.get('/hakkimda', (ctx) => {
  ctx.body='<h1>Burası hakkimda sayfasidir.</h1>'
});

//Routing to Iletisim page
rout.get('/iletisim', (ctx) => {
  ctx.body='<h1>Burası iletisim sayfasidir.</h1>'
});

//Applying all routers
app.use(rout.routes())
.use(rout.allowedMethods())
  
//Listening the 5000 port
app.listen(5000,()=>console.log('Server Started.'));