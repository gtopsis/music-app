const request = require("supertest");
const app = require("../src/app");

const testSetupService = require("./testSetupService");
testSetupService.setUpTestEnv(app);

describe("POST /v1/artists", () => {
  it("Create an artist successfully", async () => {
    const response = await request(app)
      .post("/v1/artists")
      .send({name: "john"})
      .set("Accept", "application/json")
      // .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("GET /v1/artists", () => {
  it("Retrieve all artists successfully", async () => {
    const response = await request(app)
      .get("/v1/artists")
      .set("Accept", "application/json")
      // .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("PATCH /v1/artists/:id", () => {
  it("Update an Artist successfully", async () => {
    const response = await request(app)
      .patch("/v1/artists")
      .send({name: "john"})
      .set("Accept", "application/json")
      // .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("GET /v1/artists/:id", () => {
  it("Retrieve an Artist successfully", async () => {
    const response = await request(app)
      .get("/v1/artists")
      .set("Accept", "application/json")
      // .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("DELETE /v1/artists/:id", () => {
  it("Delete an Artist successfully", async () => {
    const response = await request(app)
      .delete("/v1/artists")
      .set("Accept", "application/json")
      // .expect("Content-Type", /json/)
      .expect(200);
  });
});
