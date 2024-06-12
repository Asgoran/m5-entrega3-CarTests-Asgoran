import { prisma } from "../../../database/prisma"
import supertest from "supertest";
import { app } from "../../../app";

describe("Car delete integration tests", () => {
    const request = supertest(app);
    const endpoint = "/api/cars/"

    beforeEach(async () => {
        await prisma.car.deleteMany();

    });
    test("Should be able to delete a car sucessfully", async () => {
        const validPayload = {
            name: "corsa",
            description: "corsinha teste",
            brand: "Chevrolet",
            year: 2002,
            km: 130000
        };
        const response = await request.post(endpoint).send(validPayload);

        const deletedCar = await request.delete(endpoint + response.body.id);

        const getDeletedCarById = await request.get(endpoint + response.body.id);

        expect(getDeletedCarById.body).toEqual({ "message": "Car not found." });
        expect(deletedCar.body).toBeNull;
        expect(deletedCar.status).toBe(204);
    });
    test("Should throw an error if try to catch an invalid Id", async () => {
        const validPayload = {
            name: "corsa",
            description: "corsinha teste",
            brand: "Chevrolet",
            year: 2002,
            km: 130000
        };
        await request.post(endpoint).send(validPayload);
        const getByWrongId = await request.get(endpoint + 1);

        expect(getByWrongId.body).toEqual({ "message": "Car not found." });
        expect(getByWrongId.status).toBe(404);

    })

})
