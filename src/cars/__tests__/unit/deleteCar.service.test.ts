import { prisma } from "../../../database/prisma";
import { deleteCar } from "../../services"

describe("Car service update unit tests", () => {
    beforeEach(async () => {
        await prisma.car.deleteMany();
    });
    test("Should be able to delete a Car by Id", async () => {
        const car = {
            name: "corsa",
            description: "corsinha teste",
            brand: "Chevrolet",
            year: 2002,
            km: 50000
        };
        const createdCar = await prisma.car.create({ data: car });
        await deleteCar(createdCar.id);
        const cars = await prisma.car.findMany();
        expect(cars).toEqual([]);
    });
    test("Should throw an error if try to delete a Car with non existing Id", async () => {
        const nonExistingId = 1000000;

        await expect(deleteCar(nonExistingId)).rejects.toThrow("Car not found.");
    })
})