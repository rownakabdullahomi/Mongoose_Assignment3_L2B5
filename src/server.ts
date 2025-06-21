import express from "express";
import cors from "cors";
import config from "./config";
import connectDB from "./db/db";
import routes from "./routes/routes";



const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(config.port, ()=>{
    connectDB();
    console.log(`⚡ Server is running on port: ${config.port}.`);
})