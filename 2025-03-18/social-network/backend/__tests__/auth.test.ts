import request from "supertest";
import app from "../src/app";

let token: string; // Store the token globally

describe("Authentication Endpoints", () => {
  it("should log in a user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "bob000",
      password: "123456",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("jwt");

    token = res.body.jwt; // Store token again in case login test runs first
  });
});

export { token }; // Export token for other test files
