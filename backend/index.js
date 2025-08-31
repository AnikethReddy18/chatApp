import http from "http"
import express, { urlencoded } from "express"
import router from "./routers/router.js"
import cors from "cors"
import { Server } from "socket.io"

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
		credentials: true
	}
});
const PORT = process.env.PORT || 3000

app.use(urlencoded({ extended: true }))
app.use(cors())

app.use("/", router.authRouter);
app.use("/", router.messageRouter);
app.use("/", router.userRouter)

io.on('connection', (socket) => {

	socket.on('joinRoom', ({ sender_id, receiver_id }) => {
		const roomName = [receiver_id, sender_id].sort().join('-')
		socket.join(roomName)
	})

	socket.on('sendMessage', ({ sender_id, receiver_id, message }) => {
		const roomName = [receiver_id, sender_id].sort().join('-')
		io.to(roomName).emit('newMessage', { id: 0, sender_id, receiver_id, content: message, date: new Date().toISOString() })
	})
})


server.listen(PORT, () => console.log("Listening at http://localhost:" + PORT))
