import { prisma } from "../../../database/prisma"
import supertest from "supertest";
import { app } from "../../../app";

describe("Car update integration tests", () => {
    const request = supertest(app);
    const endpoint = "/api/cars/"

    beforeEach(async () => {
        await prisma.car.deleteMany();

    });
    test("Should be able to update a car by id", async () => {
        const validPayload = {
            name: "corsa",
            description: "corsinha teste",
            brand: "Chevrolet",
            year: 2002,
            km: 130000
        };
        const response = await request.post(endpoint).send(validPayload);

        const validUpdate = {
            name: "corsa updated"
        }

        await request.patch(endpoint + response.body.id).send(validUpdate);
        const getById = await request.get(endpoint + response.body.id);
        const expectedResponseBody = {
            id: expect.any(Number),
            name: validUpdate.name,
            description: validPayload.description,
            brand: validPayload.brand,
            year: validPayload.year,
            km: validPayload.km
        };

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
    });
    test("Should throw an error if try update with an invalid body", async () => {
        const validPayload = {
            name: "corsa",
            description: "corsinha teste",
            brand: "Chevrolet",
            year: 2002,
            km: 130000
        };
        const response = await request.post(endpoint).send(validPayload);

        const invalidUpdate = {
            name: 123
        }

        const invalidResponse = await request.patch(endpoint + response.body.id).send(invalidUpdate);

        expect(invalidResponse.body.errors).toBeDefined();
        expect(invalidResponse.status).toBe(400);


    })
})