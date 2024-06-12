import { prisma } from "../../../database/prisma"
import supertest from "supertest";
import { app } from "../../../app";

describe("Car list integration tests", () => {
    const request = supertest(app);
    const endpoint = "/api/cars"

    beforeEach(async () => {
        await prisma.car.deleteMany();

    });
    test("Should be able to list cars sucessfully", async () => {
        const validPayload1 = {
            name: "corsa",
            description: "corsinha teste",
            brand: "Chevrolet",
            year: 2002,
            km: 130000
        };
        const validPayload2 = {
            name: "astra",
            description: "astrinha teste",
            brand: "Chevrolet",
            year: 2012,
            km: 100000
        };
        const validPayload3 = {
            name: "nissan",
            description: "nissanzinho teste",
            brand: "Nissan",
            year: 2022,
            km: 50000
        };
        await request.post(endpoint).send(validPayload1);
        await request.post(endpoint).send(validPayload2);
        await request.post(endpoint).send(validPayload3);

        const response = request.get(endpoint);

        const expectedResponseBody = [{
            id: expect.any(Number),
            name: validPayload1.name,
            description: validPayload1.description,
            brand: validPayload1.brand,
            year: validPayload1.year,
            km: validPayload1.km
        }, {
            id: expect.any(Number),
            name: validPayload2.name,
            description: validPayload2.description,
            brand: validPayload2.brand,
            year: validPayload2.year,
            km: validPayload2.km
        }, {
            id: expect.any(Number),
            name: validPayload3.name,
            description: validPayload3.description,
            brand: validPayload3.brand,
            year: validPayload3.year,
            km: validPayload3.km
        }];
        expect((await response).body).toEqual(expectedResponseBody);
        expect((await response).status).toBe(201);
    });
})
