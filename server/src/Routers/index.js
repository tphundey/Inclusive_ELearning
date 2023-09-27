import userRouter from "./user";
import productRouter from './Course'
import CategoryRouter from "./Categorys";
import CartRouter from "./Cart";
const routerApp = (app) => {
    app.use("/api", userRouter);
    app.use("/api", productRouter);
    app.use("/api", CategoryRouter);
    app.use("/api", CartRouter);
};

export default routerApp;
