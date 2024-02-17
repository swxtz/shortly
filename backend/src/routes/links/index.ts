import type { FastifyInstance } from "fastify";
import { z } from "zod";

export async function linksRoutes(app: FastifyInstance) {
    app.post("/create/free", async (request, reply) => {
        const schema = z.object({
            url: z.string(),
        });

        try {
            const { url } = schema.parse(request.body);
            const id = Math.random().toString(36).substr(2, 5);
            await app.redis.set(id, url);
            reply.send({ id });
        } catch (error) {
            if (error instanceof z.ZodError) {
                reply.status(400).send({ message: error });
                return;
            }
            console.error(error);
            reply.status(400).send({ message: "Invalid request" });
        }
    });
}
