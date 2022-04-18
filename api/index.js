const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/status', (request, response) => response.json({clients: clients.length}));

const PORT = 3001;

let clients = [];
// let facts = [];
var isBanner=true;

function eventsHandler(request, response, next) {
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);
  
    const data = `data: ${JSON.stringify(isBanner)}\n\n`;
  
    response.write(data);
  
    const clientId = Date.now();
  
    const newClient = {
      id: clientId,
      response
    };
  
    clients.push(newClient);
  
    request.on('close', () => {
      console.log(`${clientId} Connection closed`);
      clients = clients.filter(client => client.id !== clientId);
    });
  }
  function sendEventsToAll(newFact) {
    // clients.forEach(client => client.response.write(`data: ${JSON.stringify(newFact)}\n\n`))
    if (clients.length!==0)clients[clients.length-1].response.write(`data: ${JSON.stringify(newFact)}\n\n`)
  }
  var i=0;
  async function addFact(request, respsonse, next) {
    const newFact = request.body;
    console.log(request.body)
    // facts.push(newFact);
    respsonse.json(newFact)
    return sendEventsToAll(i++);
  }
  
  function sendBanner(newFact) {
    // clients.forEach(client => client.response.write(`data: ${JSON.stringify(newFact)}\n\n`))
    if (clients.length!==0)clients[clients.length-1].response.write(`data: ${JSON.stringify(newFact)}\n\n`)
  }

  app.post('/fact', addFact);
  app.post('/banner',(req,res)=>{
    isBanner=req.body.banner
    console.log(isBanner)
    sendBanner(isBanner)
    res.send({a:"ok"})
  })
  app.get('/events', eventsHandler);



app.listen(PORT, () => {
  console.log(`Facts Events service listening at http://localhost:${PORT}`)
})








































// const app=require("express")();
// const cors=require("cors")

// app.use(cors())



// app.get("/stream",(req,res)=>{
//     res.setHeader("Content-Type","text/event-stream");
//     send(res)
// }
// );
// var i=0;
// function send(res){
//     res.write("hello world ");
//     i++;
//     if(i<=5)
//     setTimeout(()=>{
//         send(res)
//     },1000)
// }


// app.listen(8080);

// console.log("Listening on 8080")