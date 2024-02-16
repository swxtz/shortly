import { z } from "zod";

const schema = z.object({
    PORT: z.coerce.number(),
});

export const env = schema.parse(process.env);
