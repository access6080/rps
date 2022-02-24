import { Server } from "socket.io";
import {playGame} from './game_logic/game.js'

const io = new Server({
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socket.on('play round', stream => {
        // console.log(stream)
        const result = playGame(stream)
        
        // console.log(result)
        socket.emit('result', result)
    })
});

io.listen(3001);