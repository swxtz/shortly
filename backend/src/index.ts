import Fastify from "fastify";
import { env } from "./utils/env";

const app = Fastify();

app.listen({
    port: 3333,
}).then(() => {
    console.log(`🚀 HTTP server running on port http://localhost:${env.PORT}`);
});
