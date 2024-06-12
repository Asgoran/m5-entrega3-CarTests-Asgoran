import { Router } from "express";
import { createController, deleteController, listByIdController, listController, updateController } from "./controllers";
import { idExists, isBodyValid } from "../middlewares";
import { carSchemaPayload, carSchemaUpdate } from "./schemas";

export const carRouter = Router();

carRouter.post("", isBodyValid(carSchemaPayload), createController);

carRouter.get("", listController);

carRouter.get("/:id", idExists(), listByIdController);

carRouter.patch("/:id", isBodyValid(carSchemaUpdate), updateController);

carRouter.delete("/:id", idExists(), deleteController);
