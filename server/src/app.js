import mongoose from "mongoose";
import express from "express";
import routerApp from "./Routers";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
routerApp(app);

app.get("/", (req, res) => {
    res.send("Hello world");
});

mongoose.connect('mongodb+srv://Graduation:123@cluster0.nzrddg9.mongodb.net/LinkedIn_Learning').then(
    () => {
        console.log('Connected successfully!');
    }
).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

export const viteNodeApp = app;
