import { prisma } from "../../../database/prisma"
import supertest from "supertest";
import { app } from "../../../app";

describe("Car create integration tests", () => {
    const request = supertest(app);
    const endpoint = "/api/cars"

    beforeEach(async () => {
        await prisma.car.deleteMany();

    });
    test("Should be able to create a car", async () => {
        const validPayload = {
            name: "corsa",
            description: "corsinha teste",
            brand: "Chevrolet",
            year: 2002,
            km: 50000
        };

        const response = await request.post(endpoint).send(validPayload);

        const expectedResponseBody = {
            id: expect.any(Number),
            name: validPayload.name,
            description: validPayload.description,
            brand: validPayload.brand,
            year: validPayload.year,
            km: validPayload.km
        }

        expect(response.body).toEqual(expectedResponseBody);
        expect(response.status).toBe(201);

    });
    test("Should throw an error if try to create a Car with no body", async () => {
        const invalidPayload = {
        };

        const response = await request.post(endpoint).send(invalidPayload);

        expect(response.body.errors).toBeDefined();

        const requiredKeys = ["name", "brand", "year", "km"];
        const receivedKeys = Object.keys(response.body.errors);

        expect(receivedKeys).toEqual(requiredKeys);

    });
    test("Should throw an error if try to create a Car with missing required keys", async () => {
        const invalidPayload = {
            name: "corsa",
            description: "corsinha teste",
            year: 2002,
            km: 50000
        };
        const response = await request.post(endpoint).send(invalidPayload);

        expect(response.body.errors).toBeDefined();

    })
})