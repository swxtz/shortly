import { app } from "./app";
import { env } from "./utils/env";

async function start() {
    await app()
        .listen({
            port: env.PORT,
        })
        .then(() => {
            console.log(
                `🚀 HTTP server running on port http://localhost:${env.PORT}`,
            );
        });
}

start();
