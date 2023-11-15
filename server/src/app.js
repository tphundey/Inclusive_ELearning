import mongoose from "mongoose";
import express from "express";
import routerApp from "./Routers";

import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
routerApp(app);

app.get("/", (req, res) => {
    res.send("Hello word");
});


mongoose.connect('mongodb+srv://datnsph25191:lvmSjx4T4CvRDckN@cluster0.4xubugv.mongodb.net/').then(
    console.log('Connected successfully')
)
export const viteNodeApp = app;