import { prisma } from "../../../database/prisma";
import { list } from "../../services"

describe("Car service create unit tests", () => {
    beforeEach(async () => {
        await prisma.car.deleteMany();
    });
    test("Should be able to list all cars", async () => {
        const validTestCars = [
            {
                name: "corsa",
                description: "corsinha teste",
                brand: "Chevrolet",
                year: 2002,
                km: 500000
            },
            {
                name: "astra",
                description: "astrinha teste",
                brand: "Chevrolet",
                year: 2012,
                km: 100000
            },
            {
                name: "C3",
                description: "c3zinho teste",
                brand: "Citroen",
                year: 2022,
                km: 50000
            }
        ];
        await prisma.car.createMany({ data: validTestCars });
        const receivedValue = await list();
        const expectedValue = [
            {
                id: expect.any(Number),
                name: "corsa",
                description: "corsinha teste",
                brand: "Chevrolet",
                year: 2002,
                km: 500000
            },
            {
                id: expect.any(Number),
                name: "astra",
                description: "astrinha teste",
                brand: "Chevrolet",
                year: 2012,
                km: 100000
            },
            {
                id: expect.any(Number),
                name: "C3",
                description: "c3zinho teste",
                brand: "Citroen",
                year: 2022,
                km: 50000
            }
        ];
        expect(receivedValue).toEqual(expectedValue);
    })
})
