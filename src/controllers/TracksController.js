const TracksService = require("../services/TracksService");
const RecordingsService = require("../services/RecordingsService");
const DurationsService = require("../services/DurationsService");
const Op = require("sequelize").Op;

const createTrack = async (req, res, next) => {
  try {
    // validate params and body
    const recordingId = req.params.recordingId;
    const {title, position, duration} = req.body;

    let durationParts = duration.split(":");
    let seconds = durationParts.length != 0 ? durationParts.pop() : 0;
    let minutes = durationParts.length != 0 ? durationParts.pop() : 0;
    let hours = durationParts.length != 0 ? durationParts.pop() : 0;

    if (durationParts.length == 0) {
      throw {
        status: 400,
      };
    }

    const recordingFound = await RecordingsService.retrieveRecording({uuid: recordingId});

    if (!recordingFound) {
      throw {status: 400};
    }

    const trackFound = await TracksService.retrieveTrack({title, recordingUUID: recordingId});

    if (trackFound) {
      throw {status: 409};
    }

    // TODO check if a track in the same album has the same position

    let trackData = {title, position};
    let newTrack = await TracksService.createTrack(trackData, recordingFound.uuid);

    let durationData = {hours, minutes, seconds};
    let newDuration = await DurationsService.createDuration(durationData, {trackUUID: newTrack.uuid});

    res.locals.data = {...newTrack.dataValues, duration: newDuration};
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

    let durationParts = duration.split(":");
    let seconds = durationParts.length != 0 ? durationParts.pop() : 0;
    let minutes = durationParts.length != 0 ? durationParts.pop() : 0;
    let hours = durationParts.length != 0 ? durationParts.pop() : 0;

    if (durationParts.length == 0) {
      throw {
        status: 400,
      };
    }

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

    let trackData = {title, position};
    let trackUpdated = await TracksService.trackDataTrack(trackId, trackData);

    let durationFound = await DurationsService.retrieveDuration({
      recordingUUID: recordingFound.uuid,
    });
    if (!durationFound) {
      throw {staus: 500};
    }

    let durationData = {hours, minutes, seconds};
    let durationUpdated = await DurationsService.updateDuration(durationFound.uuid, durationData);

    res.locals.data = {...trackUpdated.dataValues, duration: durationUpdated};
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
