import userRouter from "./user";
import productRouter from './Course'
import Categoryrouter from "./Categorys";
const routerApp = (app) => {
    app.use("/api", userRouter);
    app.use("/api", productRouter);
    app.use("/api", Categoryrouter);
};

export default routerApp;
