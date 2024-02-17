import { z } from "zod";

const schema = z.object({
    PORT: z.coerce.number(),
    REDIS_URL: z.string().url(),
});

export const env = schema.parse(process.env);
