import express, { urlencoded } from "express"
import router from "./routers/router.js"
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 3000
app.use(urlencoded({extended: true}))
app.use(cors())

app.use("/", router.authRouter);
app.use("/", router.messageRouter);
app.use("/", router.userRouter)

app.listen(PORT, ()=>console.log("Listening at http://localhost:"+PORT))