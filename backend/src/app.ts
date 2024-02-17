import Fastify from "fastify";
import { env } from "./utils/env";
import { linksRoutes } from "./routes/links";
import fastifyRedis from "@fastify/redis";

export function app() {
    const app = Fastify();

    app.register(linksRoutes, { prefix: "/links" });

    app.register(fastifyRedis, { url: env.REDIS_URL });

    return app;
}
