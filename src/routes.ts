import { Express } from "express";
import { carRouter } from "./cars/router";

export const initRoutes = (app: Express) => {
    app.use("/api/cars", carRouter);
}