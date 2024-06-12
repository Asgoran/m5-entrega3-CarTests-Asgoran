import express from "express";
import "express-async-errors";
import { initRoutes } from "./routes";
import { handleErrors } from "./errors/handle.errors";
// import helmet from "helmet";

export const initApp = () => {
    const app = express();
    app.use(express.json());

    initRoutes(app);

    app.use(handleErrors);

    return app;
}

// app.use(helmet());



// app.use('/categories', categoryRouter);


export const app = initApp()