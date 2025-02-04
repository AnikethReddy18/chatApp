import express, { urlencoded } from "express"
import router from "./routers/router.js"

const app = express();
const PORT = process.env.PORT || 3000
app.use(urlencoded({extended: true}))

app.use("/", router.authRouter);

app.listen(PORT, ()=>console.log("Listening at http://localhost:"+PORT))