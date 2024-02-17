import Fastify from "fastify";
import { env } from "./utils/env";
import { linksRoutes } from "./routes/links";
import fastifyRedis from "@fastify/redis";

const app = Fastify();

app.register(linksRoutes, { prefix: "/links" });

app.register(fastifyRedis, { url: env.REDIS_URL });

app.listen({
    port: env.PORT,
}).then(() => {
    console.log(`🚀 HTTP server running on port http://localhost:${env.PORT}`);
});
