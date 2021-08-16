const request = require("supertest");
const app = require("../src/app");
const logger = require("../src/logger");

const artists = require("./seeds/artists");
const recordings = require("./seeds/recordings");
const {trackWithInvalidUUID} = require("./seeds/tracks");
const tracks = require("./seeds/tracks");

const testSetupService = require("./testSetupService");
testSetupService.setUpTestEnv(app);

const {artistWithCompleteData} = artists;
const {recordingWithCompleteData} = recordings;
const {
  trackWithCompleteData,
  trackWithCompleteData2,
  trackWithMissingTitle,
  trackWithMissingPosition,
  trackWithMissingDuration,
  trackUpdateTitle,
  trackWithInvalidPosition,
  trackWithInvalidDuration,
} = tracks;

let newArtistUUID;
let newRecordingUUID;
let newTrackUUID;

describe("Setup env by creatingan artist", () => {
  it("should create an artist successfully", async () => {
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

  it("should create a recording successfully", async () => {
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
      })
    );

    expect(receivedRecording.uuid).toBeTruthy();
    newRecordingUUID = receivedRecording.uuid;

    expect(receivedRecording.createdAt).toBeTruthy();
    expect(receivedRecording.updatedAt).toBeTruthy();
  });
});

describe("POST /v1/recordings/:id/tracks", () => {
  it("should return 201 if complete data are passed", async () => {
    const res = await request(app)
      .post(`/v1/recordings/${newRecordingUUID}/tracks`)
      .send(trackWithCompleteData)
      .set("Accept", "application/json")
      .expect(201);

    let resData = res.body.data;
    let receivedTrack = resData;

    let {title, position, duration} = trackWithCompleteData;

    let {seconds, minutes, hours} = testSetupService.parseDuration(duration);

    expect(receivedTrack).toEqual(
      expect.objectContaining({
        title,
        position,
        recordingUUID: newRecordingUUID,
        duration: expect.objectContaining({
          hours,
          minutes,
          seconds,
        }),
      })
    );

    expect(receivedTrack.uuid).toBeTruthy();
    newTrackUUID = receivedTrack.uuid;

    expect(receivedTrack.createdAt).toBeTruthy();
    expect(receivedTrack.updatedAt).toBeTruthy();

    const res2 = await request(app)
      .get(`/v1/artists/${newArtistUUID}/recordings/${newRecordingUUID}`)
      .set("Accept", "application/json")
      .expect(200);

    let receivedRecording = res2.body.data;

    expect(receivedRecording).toEqual(
      expect.objectContaining({
        title: recordingWithCompleteData.title,
        artistUUID: newArtistUUID,
        duration: expect.objectContaining({
          hours,
          minutes,
          seconds,
        }),
      })
    );

    expect(receivedRecording.uuid).toBeTruthy();
    expect(receivedRecording.createdAt).toBeTruthy();
    expect(receivedRecording.updatedAt).toBeTruthy();

    let tracks = receivedRecording.tracks;
    expect(Array.isArray(tracks)).toBe(true);
    expect(tracks).toHaveLength(1);

    let track = tracks[0];
    expect(track.uuid).toBeTruthy();
  });

  it("should return 400 if track's title is empty", async () => {
    const trackWithEmptyTitle = tracks.trackWithEmptyTitle;
    const res = await request(app)
      .post(`/v1/recordings/${newRecordingUUID}/tracks`)
      .send(trackWithEmptyTitle)
      .set("Accept", "application/json")
      .expect(400);
  });

  it("should return 409 if track's title is occupied", async () => {
    const trackWithOccupiedTitle = tracks.trackWithOccupiedTitle;
    const res = await request(app)
      .post(`/v1/recordings/${newRecordingUUID}/tracks`)
      .send(trackWithOccupiedTitle)
      .set("Accept", "application/json")
      .expect(409);
  });
});

describe("PATCH /v1/recordings/:id/tracks/:id", () => {
  let trackUpdateTitle = tracks.trackUpdateTitle;

  it("should return 200 updating an track's title", async () => {
    const res = await request(app)
      .patch(`/v1/recordings/${newRecordingUUID}/tracks/${newTrackUUID}`)
      .send(trackUpdateTitle)
      .set("Accept", "application/json")
      .expect(200);

    let resData = res.body.data;
    let receivedTrack = resData;

    let {seconds, minutes, hours} = testSetupService.parseDuration(trackWithCompleteData.duration);

    let {title} = trackUpdateTitle;
    expect(receivedTrack).toEqual(
      expect.objectContaining({
        title,
        recordingUUID: newRecordingUUID,
        duration: expect.objectContaining({
          hours,
          minutes,
          seconds,
        }),
      })
    );

    expect(receivedTrack.uuid).toBeTruthy();

    expect(receivedTrack.createdAt).toBeTruthy();
    expect(receivedTrack.updatedAt).toBeTruthy();
  });

  it("should return 404 when an unknown track is passed", async () => {
    const trackUnknown = tracks.trackUnknown;
    const res = await request(app)
      .patch(`/v1/recordings/${newRecordingUUID}/tracks/${trackUnknown.uuid}`)
      .send({})
      .set("Accept", "application/json")
      .expect(404);
  });

  it("should return 400 when an invalid uuid is passed as trackId", async () => {
    const trackWithInvalidUUID = tracks.trackWithInvalidUUID;

    const res = await request(app)
      .patch(`/v1/recordings/${newRecordingUUID}/tracks/${trackWithInvalidUUID.uuid}`)
      .send({})
      .set("Accept", "application/json")
      .expect(400);
  });
});

describe("GET /v1/recordings/:id/tracks/:id", () => {
  let trackUpdateTitle = tracks.trackUpdateTitle;

  it("should return 200 returning the updated recording", async () => {
    const res = await request(app)
      .get(`/v1/recordings/${newRecordingUUID}/tracks/${newTrackUUID}`)
      .set("Accept", "application/json")
      .expect(200);

    let resData = res.body.data;
    let receivedTrack = resData;

    let {seconds, minutes, hours} = testSetupService.parseDuration(trackWithCompleteData.duration);

    let {title} = trackUpdateTitle;
    expect(receivedTrack).toEqual(
      expect.objectContaining({
        title,
        position: trackWithCompleteData.position,
        recordingUUID: newRecordingUUID,
        duration: expect.objectContaining({
          hours,
          minutes,
          seconds,
        }),
      })
    );

    expect(receivedTrack.uuid).toBeTruthy();

    expect(receivedTrack.createdAt).toBeTruthy();
    expect(receivedTrack.updatedAt).toBeTruthy();
  });

  it("should return 404 when an unknown track is passed", async () => {
    const trackUnknown = tracks.trackUnknown;

    const res = await request(app)
      .get(`/v1/recordings/${newRecordingUUID}/tracks/${trackUnknown.uuid}`)
      .set("Accept", "application/json")
      .expect(404);
  });

  it("should return 400 when an invalid uuid is passed as trackId", async () => {
    const trackWithInvalidUUID = tracks.trackWithInvalidUUID;
    const res = await request(app)
      .get(`/v1/recordings/${newRecordingUUID}/tracks/${trackWithInvalidUUID.uuid}`)
      .set("Accept", "application/json")
      .expect(400);
  });
});

describe("DELETE /v1/recordings/:id/tracks/:id", () => {
  const {trackUnknown, trackWithInvalidUUID} = tracks;
  it("should return 204 and get 404 trying to retrieve the track", async () => {
    const res1 = await request(app)
      .delete(`/v1/recordings/${newRecordingUUID}/tracks/${newTrackUUID}`)
      .set("Accept", "application/json")
      .expect(204);

    const res2 = await request(app)
      .get(`/v1/recordings/${newRecordingUUID}/tracks/${newTrackUUID}`)
      .set("Accept", "application/json")
      .expect(404);
  });

  it("should return 404 when an unknown track is passed", async () => {
    const res = await request(app).delete(`/v1/recordings/${newRecordingUUID}/tracks/${trackUnknown.uuid}`).expect(404);
  });

  it("should return 400 when an invalid uuid is passed as trackId", async () => {
    const res = await request(app)
      .delete(`/v1/recordings/${newRecordingUUID}/tracks/${trackWithInvalidUUID.uuid}`)
      .expect(400);
  });
});
