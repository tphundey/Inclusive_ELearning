import mongoose from "mongoose";
import express from "express";
import productRouter from "./routers/product";
import authRouter from "./routers/auth";
import categoryRouter from "./routers/category";
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors())
app.use('/api', productRouter)
//singup
app.use('/api', authRouter)
app.use('/api', categoryRouter)
mongoose.connect('mongodb://127.0.0.1:27017/nodejs').then(
    console.log('connect thanh cong')
)
export const viteNodeApp = app;