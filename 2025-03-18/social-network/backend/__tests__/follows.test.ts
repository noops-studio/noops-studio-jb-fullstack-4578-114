import request from "supertest";
import app from "../src/app";
import { token } from "./auth.test"; // Import token from auth test

describe("Follow API", () => {
  const user2Id = "034485be-cfd2-48a7-b80d-f54773eab18c";

  it("should follow another user", async () => {
    const res = await request(app)
      .post(`/api/follows/follow/${user2Id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });

  it("should fetch followers", async () => {
    const res = await request(app)
      .get("/api/follows/followers")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should unfollow a user", async () => {
    const res = await request(app)
      .post(`/api/follows/unfollow/${user2Id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
});
