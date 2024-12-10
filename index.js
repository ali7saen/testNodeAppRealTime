const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require('http');
const path = require("path")


const app = express();


app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'))

app.get("/", (req, res) => {
    res.status(200).render("index", {title: "محادثة تجريبية"})
})

app.use(express.json())


const server = createServer(app);
const io = new Server(server, {
    cors : {
        origin : '*',
        methods : ['GET', 'POST']
    }
})




io.on('connection', (socket)=> {
    console.log('New client connected', socket.id);
    // Listen for events from the client

    socket.on('SEND_MESSAGE', (msg) => {
        // Broadcast the message to all connected clients
        socket.broadcast.emit('RECEIVE_MESSAGE', msg);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
    });

})


const PORT = 9000;
server.listen(PORT, () => {
    console.log(`server is running on port:${PORT} \n http://localhost:9000`);
});