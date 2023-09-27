import mongoose from "mongoose";
import express from "express";
import routerApp from "./router";
// import productRouter from "./routers/product";
// import authRouter from "./routers/auth";
// import categoryRouter from "./routers/category";

import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors())
routerApp(app);

app.get("/", (req, res) => {
    res.send("Hello word");
});
// app.use('/api', productRouter)
//singup
// app.use('/api', authRouter)
// app.use('/api', categoryRouter)
mongoose.connect('mongodb+srv://datnsph25191:lvmSjx4T4CvRDckN@cluster0.4xubugv.mongodb.net/').then(
    console.log('Connected successfully')
)
export const viteNodeApp = app;