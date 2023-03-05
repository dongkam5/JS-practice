import express from "express";
import {Server} from "socket.io";
import path from "path";
import http from 'http';
import { instrument } from "@socket.io/admin-ui";

const app = express();
const __dirname=path.resolve();
app.set('view engine','pug');
app.set('views', __dirname+"/views");
app.use('/public',express.static(__dirname+'/public'));
app.get('/',(req,res)=> res.render('home'));
app.get('/*',(req,res)=>res.redirect("/"));

const handleListen= () => console.log(`Listening on http://localhost:3000`);

const httpServer=http.createServer(app);
const wsServer=new Server(httpServer,{
    cors:{
        origin:["http://admin.socket.io"],
        credentials:true,
    },
});
instrument(wsServer,{
    auth:false,
})

function publicRooms(){
    const {
        sockets:{
            adapter:{sids,rooms},
        },
    }= wsServer;
    const publicRooms =[];
    rooms.forEach((_,key)=>{
        if(sids.get(key)===undefined){
            publicRooms.push(key)
        }
    });
    return publicRooms;
}

function countRoom(roomName){
    return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

wsServer.on("connection",socket=>{
    socket['nickname']='Anon';
    wsServer.sockets.emit("room_change",publicRooms());
    socket.on('enter_room',(roomName,done)=>{
        socket.join(roomName);
        done();
        socket.to(roomName).emit("welcome",socket.nickname,countRoom(roomName)); 
        wsServer.sockets.emit("room_change",publicRooms());
    });
    socket.on('disconnecting',()=>{
        socket.rooms.forEach(room=> socket.to(room).emit("bye",socket.nickname,countRoom(room)-1));
        socket.on('disconnect',()=>{
            wsServer.sockets.emit("room_change",publicRooms());
        });
    });
    socket.on('new_message',(msg,room,done)=>{
        socket.to(room).emit('new_message',`${socket.nickname}: ${msg}`);
        done();
    });
    socket.on('nickname',nickname=> socket['nickname']=nickname);
});
httpServer.listen(3000, handleListen);