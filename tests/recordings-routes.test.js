const request = require("supertest");
const app = require("../src/app");
const logger = require("../src/logger");
const artists = require("./seeds/artists");
const recordings = require("./seeds/recordings");

const testSetupService = require("./testSetupService");
testSetupService.setUpTestEnv(app);

const {recordingWithCompleteData, recordingUnknown, recordingWithInvalidUUID} = recordings;
const {artistWithCompleteData} = artists;
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
});

describe("POST /v1/artists/:id/recordings", () => {
  it("should return 201 if complete data are passed", async () => {
    const res = await request(app)
      .post(`/v1/artists/${newArtistUUID}/recordings`)
      .send(recordingWithCompleteData)
      .set("Accept", "application/json")
      .expect(201);

    let resData = res.body.data;
    let receivedRecording = resData;

    let {title} = recordingWithCompleteData;
    expect(receivedRecording).toEqual(
      expect.objectContaining({
        title,
        artistUUID: newArtistUUID,
        duration: expect.objectContaining({
          hours: 0,
          minutes: 0,
          seconds: 0,
        }),
        // tracks: [],
      })
    );

    expect(receivedRecording.uuid).toBeTruthy();
    newArtistUUID = receivedRecording.uuid;

    expect(receivedRecording.createdAt).toBeTruthy();
    expect(receivedRecording.updatedAt).toBeTruthy();
  });

  it("should return 400 if recording's title is empty", async () => {
    const recordingWithEmptyTitle = recordings.recordingWithEmptyTitle;
    const res = await request(app)
      .post(`/v1/artists/${newArtistUUID}/recordings`)
      .send(recordingWithEmptyTitle)
      .set("Accept", "application/json")
      .expect(400);

    let resData = res.body.data;
  });

  it("should return 409 if recording's title is occupied", async () => {
    const recordingWithOccupiedTitle = recordings.recordingWithOccupiedTitle;
    const res = await request(app)
      .post(`/v1/artists/${newArtistUUID}/recordings`)
      .send(recordingWithOccupiedTitle)
      .set("Accept", "application/json")
      .expect(409);

    let resData = res.body.data;
  });
});

// describe("GET /v1/artists/:id/recordings", () => {
//   it("should return 200 with all recordings", async () => {
//     const res = await request(app)
//       .get(`/v1/artists/${newArtistUUID}/recordings`)
//       .set("Accept", "application/json")
//       .expect(200);

//     let resData = res.body.data;
//     expect(Array.isArray(resData)).toBe(true);
//     expect(resData).toHaveLength(1);

//     let receivedRecording = resData[0];

//     let {name, shortName} = recordingWithCompleteData;
//     let {address, country, city, zipCode} = recordingWithCompleteData.area;
//     expect(receivedRecording).toEqual(
//       expect.objectContaining({
//         name: name,
//         shortName: shortName,
//         area: expect.objectContaining({
//           address,
//           country,
//           city,
//           zipCode,
//         }),
//       })
//     );

//     expect(receivedRecording.uuid).toBeTruthy();
//     expect(receivedRecording.createdAt).toBeTruthy();
//     expect(receivedRecording.updatedAt).toBeTruthy();
//   });
// });

// describe("PATCH /v1/artists/:id/recordings/:id", () => {
//   let recordingUpdateName = recordings.recordingUpdateName;

//   it("should return 200 updating an Artist's name", async () => {
//     const res = await request(app)
//       .patch(`/v1/artists/:id/recordings/${newArtistUUID}`)
//       .send(recordingUpdateName)
//       .set("Accept", "application/json")
//       .expect(200);

//     let resData = res.body.data;
//     let receivedRecording = resData;

//     let {shortName} = recordingWithCompleteData;
//     let {address, country, city, zipCode} = recordingWithCompleteData.area;
//     expect(receivedRecording).toEqual(
//       expect.objectContaining({
//         name: recordingUpdateName.name,
//         shortName: shortName,
//         area: expect.objectContaining({
//           address,
//           country,
//           city,
//           zipCode,
//         }),
//       })
//     );

//     expect(receivedRecording.uuid).toBeTruthy();

//     expect(receivedRecording.createdAt).toBeTruthy();
//     expect(receivedRecording.updatedAt).toBeTruthy();
//   });

//   it("should return 404 when an unknown recording is passed", async () => {
//     const res = await request(app)
//       .patch(`/v1/artists/:id/recordings/${recordingUnknown.uuid}`)
//       .send({})
//       .set("Accept", "application/json")
//       .expect(404);
//   });

//   it("should return 400 when an invalid uuid is passed as recordingId", async () => {
//     const res = await request(app)
//       .patch(`/v1/artists/:id/recordings/${recordingWithInvalidUUID.uuid}`)
//       .send({})
//       .set("Accept", "application/json")
//       .expect(400);
//   });
// });

// describe("GET /v1/artists/:id/recordings/:id", () => {
//   let recordingUpdateName = recordings.recordingUpdateName;

//   it("should return 200 returning the updated recording", async () => {
//     const res = await request(app)
//       .get(`/v1/artists/:id/recordings/${newArtistUUID}`)
//       .set("Accept", "application/json")
//       .expect(200);

//     let resData = res.body.data;
//     let receivedRecording = resData;

//     let {shortName} = recordingWithCompleteData;
//     let {address, country, city, zipCode} = recordingWithCompleteData.area;
//     expect(receivedRecording).toEqual(
//       expect.objectContaining({
//         name: recordingUpdateName.name,
//         shortName: shortName,
//         area: expect.objectContaining({
//           address,
//           country,
//           city,
//           zipCode,
//         }),
//       })
//     );

//     expect(receivedRecording.uuid).toBeTruthy();

//     expect(receivedRecording.createdAt).toBeTruthy();
//     expect(receivedRecording.updatedAt).toBeTruthy();
//   });

//   it("should return 404 when an unknown recording is passed", async () => {
//     const res = await request(app)
//       .get(`/v1/artists/:id/recordings/${recordingUnknown.uuid}`)
//       .set("Accept", "application/json")
//       .expect(404);
//   });

//   it("should return 400 when an invalid uuid is passed as recordingId", async () => {
//     const res = await request(app)
//       .get(`/v1/artists/:id/recordings/${recordingWithInvalidUUID.uuid}`)
//       .set("Accept", "application/json")
//       .expect(400);
//   });
// });

// describe("DELETE /v1/artists/:id/recordings/:id", () => {
//   it("should return 204 and get 404 trying to retrieve the recording", async () => {
//     const res1 = await request(app)
//       .delete(`/v1/artists/:id/recordings/${newArtistUUID}`)
//       .set("Accept", "application/json")
//       .expect(204);

//     const res2 = await request(app)
//       .get(`/v1/artists/:id/recordings/${newArtistUUID}`)
//       .set("Accept", "application/json")
//       .expect(404);
//   });

//   it("should return 404 when an unknown recording is passed", async () => {
//     const res = await request(app).delete(`/v1/artists/:id/recordings/${recordingUnknown.uuid}`).expect(404);
//   });

//   it("should return 400 when an invalid uuid is passed as recordingId", async () => {
//     const res = await request(app).delete(`/v1/artists/:id/recordings/${recordingWithInvalidUUID.uuid}`).expect(400);
//   });
// });
