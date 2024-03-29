const request = require("supertest");
const app = require("../src/app");
const logger = require("../src/logger");
const artists = require("./seeds/artists");

const testSetupService = require("./testSetupService");
testSetupService.setUpTestEnv(app);

const {artistWithCompleteData, artistUnknown, artistWithInvalidUUID} = artists;
let newArtistUUID;

describe("POST /v1/artists", () => {
  it("should return 201 if complete data are passed", async () => {
    const res = await request(app)
      .post("/v1/artists")
      .send(artistWithCompleteData)
      .set("Accept", "application/json")
      .expect(201);

    let resData = res.body.data;
    let receivedArtist = resData;

    let {name, shortName} = artistWithCompleteData;
    let {address, country, city, zipCode} = artistWithCompleteData.area;
    expect(receivedArtist).toEqual(
      expect.objectContaining({
        name: name,
        shortName: shortName,
        area: expect.objectContaining({
          address,
          country,
          city,
          zipCode,
        }),
      })
    );

    expect(receivedArtist.uuid).toBeTruthy();
    newArtistUUID = receivedArtist.uuid;

    expect(receivedArtist.createdAt).toBeTruthy();
    expect(receivedArtist.updatedAt).toBeTruthy();
  });

  it("should return 400 if artist's name is empty", async () => {
    const artistWithEmptyName = artists.artistWithEmptyName;
    const res = await request(app)
      .post("/v1/artists")
      .send(artistWithEmptyName)
      .set("Accept", "application/json")
      .expect(400);

    let resData = res.body.data;
  });

  it("should return 400 if artist's short name is empty", async () => {
    const artistWithEmptyShortName = artists.artistWithEmptyShortName;
    const res = await request(app)
      .post("/v1/artists")
      .send(artistWithEmptyShortName)
      .set("Accept", "application/json")
      .expect(400);

    let resData = res.body.data;
  });

  it("should return 409 if artist's short name is occupied", async () => {
    const artistWithOccupiedShortName = artists.artistWithOccupiedShortName;
    const res = await request(app)
      .post("/v1/artists")
      .send(artistWithOccupiedShortName)
      .set("Accept", "application/json")
      .expect(409);

    let resData = res.body.data;
  });
});

describe("GET /v1/artists", () => {
  it("should return 200 with all artists", async () => {
    const res = await request(app).get("/v1/artists").set("Accept", "application/json").expect(200);

    let resData = res.body.data;
    expect(Array.isArray(resData)).toBe(true);
    expect(resData).toHaveLength(1);

    let receivedArtist = resData[0];

    let {name, shortName} = artistWithCompleteData;
    let {address, country, city, zipCode} = artistWithCompleteData.area;
    expect(receivedArtist).toEqual(
      expect.objectContaining({
        name: name,
        shortName: shortName,
        area: expect.objectContaining({
          address,
          country,
          city,
          zipCode,
        }),
      })
    );

    expect(receivedArtist.uuid).toBeTruthy();
    expect(receivedArtist.createdAt).toBeTruthy();
    expect(receivedArtist.updatedAt).toBeTruthy();
  });
});

describe("PATCH /v1/artists/:id", () => {
  let artistUpdateName = artists.artistUpdateName;

  it("should return 200 updating an Artist's name", async () => {
    const res = await request(app)
      .patch(`/v1/artists/${newArtistUUID}`)
      .send(artistUpdateName)
      .set("Accept", "application/json")
      .expect(200);

    let resData = res.body.data;
    let receivedArtist = resData;

    let {shortName} = artistWithCompleteData;
    let {address, country, city, zipCode} = artistWithCompleteData.area;
    expect(receivedArtist).toEqual(
      expect.objectContaining({
        name: artistUpdateName.name,
        shortName: shortName,
        area: expect.objectContaining({
          address,
          country,
          city,
          zipCode,
        }),
      })
    );

    expect(receivedArtist.uuid).toBeTruthy();

    expect(receivedArtist.createdAt).toBeTruthy();
    expect(receivedArtist.updatedAt).toBeTruthy();
  });

  it("should return 409 if artist's short name is occupied", async () => {
    const {artistWithCompleteData2, artistWithOccupiedShortName} = artists;

    const resArtist1 = await request(app)
      .post("/v1/artists")
      .send(artistWithCompleteData2)
      .set("Accept", "application/json")
      .expect(201);

    let resData = resArtist1.body.data;
    let receivedArtist = resData;

    let {name, shortName} = artistWithCompleteData2;
    let {address, country, city, zipCode} = artistWithCompleteData2.area;
    expect(receivedArtist).toEqual(
      expect.objectContaining({
        name: name,
        shortName: shortName,
        area: expect.objectContaining({
          address,
          country,
          city,
          zipCode,
        }),
      })
    );

    expect(receivedArtist.uuid).toBeTruthy();

    expect(receivedArtist.createdAt).toBeTruthy();
    expect(receivedArtist.updatedAt).toBeTruthy();

    // try to update the artist's short name with an occupied one
    const res = await request(app)
      .patch(`/v1/artists/${receivedArtist.uuid}`)
      .send(artistWithOccupiedShortName)
      .set("Accept", "application/json")
      .expect(409);
  });

  it("should return 404 when an unknown artist is passed", async () => {
    const res = await request(app)
      .patch(`/v1/artists/${artistUnknown.uuid}`)
      .send({})
      .set("Accept", "application/json")
      .expect(404);
  });

  it("should return 400 when an invalid uuid is passed as artistId", async () => {
    const res = await request(app)
      .patch(`/v1/artists/${artistWithInvalidUUID.uuid}`)
      .send({})
      .set("Accept", "application/json")
      .expect(400);
  });
});

describe("GET /v1/artists/:id", () => {
  let artistUpdateName = artists.artistUpdateName;

  it("should return 200 returning the updated artist", async () => {
    const res = await request(app).get(`/v1/artists/${newArtistUUID}`).set("Accept", "application/json").expect(200);

    let resData = res.body.data;
    let receivedArtist = resData;

    let {shortName} = artistWithCompleteData;
    let {address, country, city, zipCode} = artistWithCompleteData.area;
    expect(receivedArtist).toEqual(
      expect.objectContaining({
        name: artistUpdateName.name,
        shortName: shortName,
        area: expect.objectContaining({
          address,
          country,
          city,
          zipCode,
        }),
      })
    );

    expect(receivedArtist.uuid).toBeTruthy();

    expect(receivedArtist.createdAt).toBeTruthy();
    expect(receivedArtist.updatedAt).toBeTruthy();
  });

  it("should return 404 when an unknown artist is passed", async () => {
    const res = await request(app)
      .get(`/v1/artists/${artistUnknown.uuid}`)
      .set("Accept", "application/json")
      .expect(404);
  });

  it("should return 400 when an invalid uuid is passed as artistId", async () => {
    const res = await request(app)
      .get(`/v1/artists/${artistWithInvalidUUID.uuid}`)
      .set("Accept", "application/json")
      .expect(400);
  });
});

describe("DELETE /v1/artists/:id", () => {
  it("should return 204 and get 404 trying to retrieve the artist", async () => {
    const res1 = await request(app)
      .delete(`/v1/artists/${newArtistUUID}`)
      .set("Accept", "application/json")
      .expect(204);

    const res2 = await request(app).get(`/v1/artists/${newArtistUUID}`).set("Accept", "application/json").expect(404);
  });

  it("should return 404 when an unknown artist is passed", async () => {
    const res = await request(app).delete(`/v1/artists/${artistUnknown.uuid}`).expect(404);
  });

  it("should return 400 when an invalid uuid is passed as artistId", async () => {
    const res = await request(app).delete(`/v1/artists/${artistWithInvalidUUID.uuid}`).expect(400);
  });
});
