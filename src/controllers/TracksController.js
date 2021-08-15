// const DurationService = require("../services/DurationService");
const TracksService = require("../services/TracksService");
const RecordingsService = require("../services/RecordingsService");
const Op = require("sequelize").Op;

// const retrieveTracks = async (req, res, next) => {
//   try {
//     // validate params and body
//     const recordingId = req.params.recordingId;

//     const recordingFound = await RecordingsService.retrieveRecording({uuid: recordingId});

//     if (!recordingFound) {
//       throw {status: 400};
//     }

//     let tracks = await TracksService.retrieveTracks();
//     res.locals.data = tracks;
//     res.locals.status = 200;
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

const createTrack = async (req, res, next) => {
  try {
    // validate params and body
    const recordingId = req.params.recordingId;
    const {title, position, duration} = req.body;

    const recordingFound = await RecordingsService.retrieveRecording({uuid: recordingId});

    if (!recordingFound) {
      throw {status: 400};
    }

    // check if the recording has an album with the same title
    const trackFound = await TracksService.retrieveTrack({title, recordingUUID: recordingId});

    if (trackFound) {
      throw {status: 409};
    }

    let data = {title, position, duration};
    let newTrack = await TracksService.createTrack(data, recordingFound.uuid);
    res.locals.data = {...newTrack.dataValues, recording: recordingFound.dataValues};
    next();
  } catch (error) {
    next(error);
  }
};

const retrieveTrack = async (req, res, next) => {
  try {
    // validate params and body
    const {trackId, recordingId} = req.params;

    const recordingFound = await RecordingsService.retrieveRecording({uuid: recordingId});

    if (!recordingFound) {
      throw {status: 400};
    }

    const trackFound = await TracksService.retrieveTrack({uuid: trackId});

    if (!trackFound) {
      throw {status: 404};
    }

    res.locals.data = trackFound;
    next();
  } catch (error) {
    next(error);
  }
};

const updateTrack = async (req, res, next) => {
  try {
    // validate params and body
    const {trackId, recordingId} = req.params;
    const {title, duration, position} = req.body;

    const recordingFound = await RecordingsService.retrieveRecording({uuid: recordingId});

    if (!recordingFound) {
      throw {status: 400};
    }

    const trackFound = await TracksService.retrieveTrack({uuid: trackId});

    if (!trackFound) {
      throw {status: 404};
    }

    if (title != undefined && title != null) {
      // check if new title is already occupied by a different album of the SAME recording
      const trackWithSameTitle = await TracksService.retrieveTrack({
        uuid: {[Op.ne]: trackId},
        title,
        recordingUUID: recordingId,
      });

      if (trackWithSameTitle) {
        throw {status: 409};
      }
    }

    let update = {title, position};
    let result = await TracksService.updateTrack(trackId, update);

    res.locals.data = result;
    next();
  } catch (error) {
    next(error);
  }
};

const deleteTrack = async (req, res, next) => {
  try {
    // validate params and body
    const {trackId, recordingId} = req.params;

    const recordingFound = await RecordingsService.retrieveRecording({uuid: recordingId});

    if (!recordingFound) {
      throw {status: 400};
    }

    const trackFound = await TracksService.retrieveTrack({uuid: trackId});

    if (!trackFound) {
      throw {status: 404};
    }

    let result = await TracksService.deleteTrack(trackId);

    res.locals.status = 204;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  // retrieveTracks,
  createTrack,
  retrieveTrack,
  updateTrack,
  deleteTrack,
};
