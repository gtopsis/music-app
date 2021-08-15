const request = require("supertest");
const app = require("../src/app");
const logger = require("../src/logger");
const {artist1} = require("./seeds/artists");
const artists = require("./seeds/artists");

const testSetupService = require("./testSetupService");
testSetupService.setUpTestEnv(app);

describe("POST /v1/artists", () => {
  it("Create an artist successfully", async () => {
    let artist1 = artists.artist1;
    const res = await request(app).post("/v1/artists").send(artist1).set("Accept", "application/json").expect(200);

    let resData = res.body.data;
    expect(resData.name).toEqual(artist1.name);
  });
});

describe("GET /v1/artists", () => {
  it("should return all artists", async () => {
    const res = await request(app).get("/v1/artists").set("Accept", "application/json").expect(200);

    let resData = res.body.data;
    expect(Array.isArray(resData)).toBe(true);
    expect(resData).toHaveLength(1);

    let receivedArtist = resData[0];

    expect(receivedArtist).toEqual(
      expect.objectContaining({
        name: artist1.name,
        shortName: artist1.shortName,
        area: expect.objectContaining({
          address: artist1.area.address,
          country: artist1.area.country,
          city: artist1.area.city,
          zipCode: artist1.area.zipCode,
        }),
      })
    );
  });
});

// describe("PATCH /v1/artists/:id", () => {
//   let artistUUID;
//   it("Update an Artist successfully", async () => {
//     const res = await request(app)
//       .patch(`/v1/artists/${artistUUID}`)
//       .send({name: "john"})
//       .set("Accept", "application/json")
//       .expect(200);
//   });
// });

// describe("GET /v1/artists/:id", () => {
//   it("Retrieve an Artist successfully", async () => {
//     const res = await request(app).get("/v1/artists").set("Accept", "application/json").expect(200);
//   });
// });

// describe("DELETE /v1/artists/:id", () => {
//   it("Delete an Artist successfully", async () => {
//     const res = await request(app).delete("/v1/artists").set("Accept", "application/json").expect(200);
//   });
// });
