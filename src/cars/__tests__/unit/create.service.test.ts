import { prisma } from "../../../database/prisma";
import { create } from "../../services"

describe("Car service create unit tests", () => {
    beforeEach(async () => {
        await prisma.car.deleteMany();
    });
    test("Should be create a Car", async () => {
        const validTestCar = {
            name: "corsa",
            description: "corsinha teste",
            brand: "Chevrolet",
            year: 2002,
            km: 50000
        }
        const receivedValue = await create(validTestCar);

        const expectedValue = {
            id: expect.any(Number),
            name: validTestCar.name,
            description: validTestCar.description,
            brand: validTestCar.brand,
            year: validTestCar.year,
            km: validTestCar.km
        }
        expect(receivedValue).toEqual(expectedValue);

        const createdCarId = await prisma.car.findUnique({
            where: { id: receivedValue.id }
        })
        expect(createdCarId).toBeTruthy();
    });

})