import { prisma } from "../database/prisma";
import { ApiError } from "../errors/api.error";
import { CarPayload, Car } from "./interfaces";

export const create = async (payload: CarPayload): Promise<Car> => {
    const newCar = await prisma.car.create({ data: payload });
    return newCar;
};
export const list = async (): Promise<Array<Car>> => {
    return await prisma.car.findMany();
};
export const listById = async (carId: number): Promise<Car> => {
    const car = await prisma.car.findFirst({
        where: { id: carId }
    });
    if (!car) {
        throw new ApiError("Car not found.");
    }
    return car;
};
export const update = async (carId: number, payload: Partial<CarPayload>): Promise<any> => {
    const foundCar = await prisma.car.findFirst({
        where: { id: carId }
    });
    if (!foundCar) {
        throw new ApiError("Car not found.", 404);
    };
    const updatedCar = await prisma.car.update({
        where: { id: carId },
        data: payload,
    });
    return updatedCar;
};
export const deleteCar = async (carId: number) => {
    await listById(carId);
    await prisma.car.delete({
        where: { id: carId }
    })
}