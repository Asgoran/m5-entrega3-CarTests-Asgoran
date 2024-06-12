import { prisma } from "../../../database/prisma"
import supertest from "supertest";
import { app } from "../../../app";

describe("Car list by Id integration tests", () => {
    const request = supertest(app);
    const endpoint = "/api/cars/"

    beforeAll(async () => {
        await prisma.car.deleteMany();

    });
    test("Should be able to list a car by id", async () => {
        const validPayload = {
            name: "corsa",
            description: "corsinha teste",
            brand: "Chevrolet",
            year: 2002,
            km: 130000
        };
        const response = await request.post(endpoint).send(validPayload);

        const expectedResponseBody = {
            id: expect.any(Number),
            name: validPayload.name,
            description: validPayload.description,
            brand: validPayload.brand,
            year: validPayload.year,
            km: validPayload.km
        };
        const getById = await request.get(endpoint + response.body.id);

        expect(getById.body).toEqual(expectedResponseBody);


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
