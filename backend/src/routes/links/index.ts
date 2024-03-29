import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { randomString } from "../../utils/random-strings";

export async function linksRoutes(app: FastifyInstance) {
    app.post(
        "/create/free",
        async (request: FastifyRequest, reply: FastifyReply) => {
            const schema = z.object({
                url: z.string().url(),
            });

            try {
                const { url } = schema.parse(request.body);
                let shortLinkCode = randomString(10);

                const verifyKey = await app.redis.get(shortLinkCode);

                if (verifyKey) {
                    shortLinkCode = randomString(10);
                }

                app.redis.setex(shortLinkCode, 60 * 30, url);
                reply.status(201).send({ shortLink: shortLinkCode });
            } catch (error) {
                if (error instanceof z.ZodError) {
                    reply.status(400).send({ message: error });
                    return;
                }
                console.error(error);
                reply.status(400).send({ message: "Invalid request" });
            }
        },
    );

    app.get(
        "/free/:key",
        async (request: FastifyRequest, reply: FastifyReply) => {
            const schema = z.object({
                key: z.string(),
            });

            try {
                const { key } = schema.parse(request.params);

                if (!key) {
                    return reply
                        .status(400)
                        .send({ message: "Invalid request" });
                }

                const url = await app.redis.get(key);

                if (!url) {
                    return reply
                        .status(404)
                        .send({ message: "Link not found" });
                }

                reply.send({ url });
            } catch (error) {
                if (error instanceof z.ZodError) {
                    reply.status(400).send({ message: error });
                    return;
                }
                console.error(error);
                reply.status(400).send({ message: "Invalid request" });
            }
        },
    );
}
