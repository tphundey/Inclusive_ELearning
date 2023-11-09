import userRouter from "./user";
import productRouter from './Course'
import UploadRouter from "./uploader";
// import CartRouter from "./Cart";
import paymentsRouter from "./payments";
import categoryRouter from "./Categorys";

const routerApp = (app) => {
    app.use("/api", userRouter);
    app.use("/api", productRouter);
    app.use("/api", categoryRouter);
    app.use("/api", UploadRouter);
    // app.use("/api", CartRouter);
    app.use("/api", paymentsRouter);
};

export default routerApp;
