import request from "supertest";
import app from "../src/app";
import { token } from "./auth.test"; // Import token from auth test

describe("Posts API", () => {
  it("should create a new post", async () => {
    const res = await request(app)
      .post("/api/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "My First Post", body: "This is a test post" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  it("should fetch all posts", async () => {
    const res = await request(app)
      .get("/api/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
