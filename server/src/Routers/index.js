import userRouter from "./user";
import productRouter from "./Course";
import UploadRouter from "./uploader";
// import CartRouter from "./Cart";
import paymentsRouter from "./payments";
import categoryRouter from "./Categorys";
import VideoRouter from "./video";
const routerApp = (app) => {
    app.use(userRouter);
    app.use(productRouter);
    app.use(categoryRouter);
    app.use(UploadRouter);
    app.use(VideoRouter);
    // app.use("/api", CartRouter);
    app.use(paymentsRouter);
};

export default routerApp;
