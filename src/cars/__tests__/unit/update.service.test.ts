import { prisma } from "../../../database/prisma";
import { update } from "../../services"

describe("Car service update unit tests", () => {
    beforeEach(async () => {
        await prisma.car.deleteMany();
    });
    test("Should be able to update a car by id", async () => {
        const car = {
            name: "corsa",
            description: "corsinha teste",
            brand: "Chevrolet",
            year: 2002,
            km: 50000
        };
        const createdCar = await prisma.car.create({ data: car });

        const toUpdatePayLoad = {
            description: "corsinha teste atualizado",
            km: 80000
        };

        const receivedValue = await update(createdCar.id, toUpdatePayLoad);
        const expectedValue = {
            id: createdCar.id,
            name: car.name,
            description: toUpdatePayLoad.description,
            brand: car.brand,
            year: car.year,
            km: toUpdatePayLoad.km
        };
        expect(receivedValue).toEqual(expectedValue);
        const updatedCar = await prisma.car.findUnique({
            where: { id: createdCar.id }
        });
        expect(updatedCar).toEqual(expectedValue);
    });
    test("Should throw an error if try to update a car with non existing id", async () => {
        const nonExistingId = 1000000;
        await expect(update(nonExistingId, {})).rejects.toThrow("Car not found.");
    })
})