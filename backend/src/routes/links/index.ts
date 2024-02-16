import type { FastifyInstance } from "fastify";

export async function LinksRoutes(app: FastifyInstance) {
    app.get("/links", async (request, reply) => {
        reply.send({ links: [] });
    });
}
