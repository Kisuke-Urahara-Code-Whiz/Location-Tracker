const express = require("express");

const app = express();
const socket = require("socket.io");
const http = require("http");

const server = http.createServer(app);

const io = socket(server);

app.set("view engine","ejs");

const path = require("path");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")));

io.on("connection",(socket)=>{
    socket.on("send-location",function(data){
        io.emit("receive-location",{id:socket.id, ...data});
    })

    socket.on("disconnect",function(){
        io.emit("user-disconnect",socket.id);  
    })
    console.log("connected");
})

app.use(express.urlencoded({extended:true}));


app.use(express.json());

let port = 3000;

server.listen(port,()=>{
    console.log("server online");
})

app.get("/",(req,res)=>{
    res.render("index");
})
