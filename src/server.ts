import express from "express";
import cors from "cors";
import config from "./config";
import { connectDB } from "./db/db";
import routes from "./routes/routes";




const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

connectDB(); // function for db connection

app.listen(config.port, ()=>{
    console.log(`⚡ Server is running on port: ${config.port}.`);
})

app.get("/", (req, res)=>{
    res.send({success: true, message: "⚡ Welcome to library server.."});
})


// library-management-backend-teal.vercel.app
