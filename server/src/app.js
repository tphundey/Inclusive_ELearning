import mongoose from "mongoose";
import express from "express";
import cors from 'cors';
import router from './controllers/course'
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", router);


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
