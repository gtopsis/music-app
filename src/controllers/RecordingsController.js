const RecordingsService = require("../services/RecordingsService");
const ArtistsService = require("../services/ArtistsService");
const TracksService = require("../services/TracksService");
// const DurationService = require("../services/DurationService");
const models = require("../models");
const Op = require("sequelize").Op;

const retrieveRecordings = async (req, res, next) => {
  try {
    // validate params and body
    const artistUUID = req.params.artistId;

    const artistFound = await models.Artist.findOne({
      where: {
        uuid: artistUUID,
      },
    });

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
    const artistUUID = req.params.artistId;
    const {title} = req.body;

    const artistFound = await models.Artist.findOne({
      where: {
        uuid: artistUUID,
      },
    });

    if (!artistFound) {
      throw {status: 400};
    }

    // check if the artist has an album with the same title
    const recordingFound = await models.Recording.findOne({
      where: {
        title,
        artistUUID,
      },
    });

    if (recordingFound) {
      throw {status: 409};
    }

    let newRecording = await RecordingsService.createRecording(title, artistFound.uuid);
    res.locals.data = {...newRecording.dataValues, artist: artistFound.dataValues};
    next();
  } catch (error) {
    next(error);
  }
};

const retrieveRecording = async (req, res, next) => {
  try {
    // validate params and body
    const {recordingId, artistId} = req.params;

    const artistFound = await models.Artist.findOne({
      where: {
        uuid: artistId,
      },
    });

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

    const artistFound = await models.Artist.findOne({
      where: {
        uuid: artistId,
      },
    });

    if (!artistFound) {
      throw {status: 400};
    }

    const uuid = req.params.recordingId;
    const {name, shortName, gender, area} = req.body;

    const recordingFound = await RecordingsService.retrieveRecording({uuid});

    if (!recordingFound) {
      throw {status: 404};
    }

    // check if new shortName is already occupied by someone else
    const recordingWithSameShortName = await RecordingsService.retrieveRecording({
      uuid: {[Op.ne]: uuid},
      shortName,
    });

    if (recordingWithSameShortName) {
      throw {status: 409};
    }

    let update = {name, shortName, gender, area};
    let result = await RecordingsService.updateRecording(uuid, update);

    // TODO update area details

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

    const artistFound = await models.Artist.findOne({
      where: {
        uuid: artistId,
      },
    });

    if (!artistFound) {
      throw {status: 400};
    }

    const uuid = req.params.recordingId;
    const recordingFound = await RecordingsService.retrieveRecording({uuid});

    if (!recordingFound) {
      throw {status: 404};
    }

    let result = RecordingsService.deleteRecording(uuid);

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
