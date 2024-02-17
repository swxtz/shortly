import { describe, it, expect } from "bun:test";
import request from "supertest";
import { app } from "../../app";

describe("Links", () => {
    describe("POST /links/create/free", async () => {
        const server = app();
        await server.ready();

        const response = await request(server.server);

        it("should return a short link", async () => {
            const res = await response.post("/links/create/free").send({
                url: "https://youtube.com",
            });

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("shortLink");
        });

        it("should return a 400 status code", async () => {
            const res = await response.post("/links/create/free").send({
                url: "youtube",
            });

            expect(res.status).toBe(400);
        });

        it("should return a 400 status code", async () => {
            const res = await response.post("/links/create/free").send({
                url: "youtube.com",
            });

            expect(res.status).toBe(400);
        });
    });

    describe("GET /links/free/:key", async () => {
        const server = app();
        await server.ready();

        const response = await request(server.server);

        it("should return a 200 status code", async () => {
            let res = await response.post("/links/create/free").send({
                url: "https://youtube.com",
            });

            res = await response.get(`/links/free/${res.body.shortLink}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("url");
        });

        it("should return a 404 status code", async () => {
            const res = await response.get("/links/free/1234567890");

            expect(res.status).toBe(404);
        });

        it("should return a 400 status code", async () => {
            const res = await response.get("/links/free/");

            expect(res.status).toBe(400);
        });
    });
});
