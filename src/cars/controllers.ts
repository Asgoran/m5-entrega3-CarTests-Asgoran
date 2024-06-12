import { Request, Response } from "express";
import { create, deleteCar, list, listById, update } from "./services";

export const createController = async (req: Request, res: Response): Promise<Response> => {
    const createdCar = await create(req.body);

    return res.status(201).json(createdCar);

};
export const listController = async (req: Request, res: Response): Promise<Response> => {
    const cars = await list();

    return res.status(201).json(cars);
}

export const listByIdController = async (req: Request, res: Response): Promise<Response> => {
    const id = Number(req.params.id);
    const car = await listById(id);
    return res.status(201).json(car);
}
export const updateController = async (req: Request, res: Response): Promise<Response> => {
    const id = Number(req.params.id);
    const updateCar = await update(id, req.body);
    return res.status(201).json(updateCar);
}
export const deleteController = async (req: Request, res: Response): Promise<Response> => {
    const id = Number(req.params.id);
    const deleteThisCar = await deleteCar(id);
    return res.status(204).json(deleteThisCar);
}