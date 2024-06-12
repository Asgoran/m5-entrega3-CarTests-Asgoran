import { prisma } from "../../../database/prisma";
import { listById } from "../../services"

describe("Car service listById unit tests", () => {
    beforeEach(async () => {
        await prisma.car.deleteMany();
    });
    test("Should be able to retrieve a Car by id", async () => {
        const car = {
            name: "corsa",
            description: "corsinha teste",
            brand: "Chevrolet",
            year: 2002,
            km: 50000
        }
        const createdCar = await prisma.car.create({ data: car });

        const receivedValue = await listById(createdCar.id);
        const expectedValue = {
            id: createdCar.id,
            name: car.name,
            description: car.description,
            brand: car.brand,
            year: car.year,
            km: car.km

        }
        expect(receivedValue).toEqual(expectedValue);
    });
    test("Should throw an error if retrieving a Car with non existing id", async () => {
        const nonExistingId = 100000;

        await expect(listById(nonExistingId)).rejects.toThrow("Car not found.")
    })
})
