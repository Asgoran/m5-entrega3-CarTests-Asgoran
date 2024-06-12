import { z } from "zod";

const carSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(50),
    description: z.string().max(255).nullish(),
    brand: z.string().max(50),
    year: z.number().positive(),
    km: z.number().positive()
});

const carSchemaPayload = carSchema.omit({ id: true });
const carSchemaUpdate = carSchema.partial();

export { carSchema, carSchemaPayload, carSchemaUpdate };