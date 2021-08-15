// const DurationService = require("../services/DurationService");
const RecordingsService = require("../services/RecordingsService");
const ArtistsService = require("../services/ArtistsService");
const DurationsService = require("../services/DurationsService");
const Op = require("sequelize").Op;

const retrieveRecordings = async (req, res, next) => {
  try {
    // validate params and body
    const artistId = req.params.artistId;

    const artistFound = await ArtistsService.retrieveArtist({uuid: artistId});

    if (!artistFound) {
      throw {status: 400};
    }

    let recordings = await RecordingsService.retrieveRecordings();
    res.locals.data = recordings;
    res.locals.status = 200;
    next();
  } catch (error) {
    next(error);
  }
};

const createRecording = async (req, res, next) => {
  try {
    // validate params and body
    const artistId = req.params.artistId;
    const {title} = req.body;

    const artistFound = await ArtistsService.retrieveArtist({uuid: artistId});

    if (!artistFound) {
      throw {status: 400};
    }

    // check if the artist has an album with the same title
    const recordingFound = await RecordingsService.retrieveRecording({title, artistUUID: artistId});

    if (recordingFound) {
      throw {status: 409};
    }

    let newRecording = await RecordingsService.createRecording(title, artistFound.uuid);
    let newDuration = await DurationsService.createDuration(
      {hours: 0, minutes: 0, seconds: 0},
      {recordingUUID: newRecording.uuid}
    );

    res.locals.data = {...newRecording.dataValues, duration: newDuration};
    next();
  } catch (error) {
    next(error);
  }
};

const retrieveRecording = async (req, res, next) => {
  try {
    // validate params and body
    const {recordingId, artistId} = req.params;

    const artistFound = await ArtistsService.retrieveArtist({uuid: artistId});

    if (!artistFound) {
      throw {status: 400};
    }

    const recordingFound = await RecordingsService.retrieveRecording({uuid: recordingId});

    if (!recordingFound) {
      throw {status: 404};
    }

    res.locals.data = recordingFound;
    next();
  } catch (error) {
    next(error);
  }
};

const updateRecording = async (req, res, next) => {
  try {
    // validate params and body
    const {recordingId, artistId} = req.params;
    const {title} = req.body;

    const artistFound = await ArtistsService.retrieveArtist({uuid: artistId});

    if (!artistFound) {
      throw {status: 400};
    }

    const recordingFound = await RecordingsService.retrieveRecording({uuid: recordingId});

    if (!recordingFound) {
      throw {status: 404};
    }

    if (title != undefined && title != null) {
      // check if new title is already occupied by a different album of the SAME artist
      const recordingWithSameTitle = await RecordingsService.retrieveRecording({
        uuid: {[Op.ne]: recordingId},
        title,
        artistUUID: artistId,
      });

      if (recordingWithSameTitle) {
        throw {status: 409};
      }
    }

    let update = {title};
    let result = await RecordingsService.updateRecording(recordingId, update);

    res.locals.data = result;
    next();
  } catch (error) {
    next(error);
  }
};

const deleteRecording = async (req, res, next) => {
  try {
    // validate params and body
    const {recordingId, artistId} = req.params;

    const artistFound = await ArtistsService.retrieveArtist({uuid: artistId});

    if (!artistFound) {
      throw {status: 400};
    }

    const recordingFound = await RecordingsService.retrieveRecording({uuid: recordingId});

    if (!recordingFound) {
      throw {status: 404};
    }

    let result = await RecordingsService.deleteRecording(recordingId);

    res.locals.status = 204;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  retrieveRecordings,
  createRecording,
  retrieveRecording,
  updateRecording,
  deleteRecording,
};
