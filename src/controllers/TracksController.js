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

    // error duration has a wrong format
    if (durationParts.length != 0) {
      throw {
        status: 400,
      };
    }

    const recordingFound = await RecordingsService.retrieveRecording({uuid: recordingId});

    if (!recordingFound) {
      throw {status: 400};
    }

    let query = {
      [Op.or]: [{title}, {position}],
      recordingUUID: recordingId,
    };
    const trackFound = await TracksService.retrieveTrack(query);

    if (trackFound) {
      throw {status: 409};
    }

    // create track
    let trackData = {title, position};
    let newTrack = await TracksService.createTrack(trackData, recordingFound.uuid);

    // create track's duration
    let durationData = {hours, minutes, seconds};
    let newTrackDuration = await DurationsService.createDuration(durationData, {trackUUID: newTrack.uuid});

    // calc recording's total duration
    let recordingTotalDuration = await RecordingsService.calcRecordingTotalDuration(recordingFound.uuid);

    // update recording's total duration
    let recordingOldDuration = await DurationsService.retrieveDuration({recordingUUID: recordingFound.uuid});
    if (!recordingOldDuration) {
      throw {status: 500};
    }

    let recordingDurationUpdated = await DurationsService.updateDuration(recordingOldDuration.uuid, {
      ...recordingTotalDuration,
    });

    res.locals.status = 201;
    res.locals.data = {...newTrack.dataValues, duration: newTrackDuration};
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
      // check if NEW title OR position is already occupied by a DIFFERENT trsck of the SAME recording
      const trackWithSameTitle = await TracksService.retrieveTrack({
        uuid: {[Op.ne]: trackId},
        [Op.or]: [{title}, {position}],
        recordingUUID: recordingId,
      });

      if (trackWithSameTitle) {
        throw {status: 409};
      }
    }

    let trackData = {title, position};
    let trackUpdated = await TracksService.updateTrack(trackId, trackData);

    let durationFound = await DurationsService.retrieveDuration({
      recordingUUID: recordingFound.uuid,
    });
    if (!durationFound) {
      throw {staus: 500};
    }

    let durationUpdated;
    if (duration) {
      let durationParts = duration.split(":");
      let seconds = durationParts.length != 0 ? durationParts.pop() : 0;
      let minutes = durationParts.length != 0 ? durationParts.pop() : 0;
      let hours = durationParts.length != 0 ? durationParts.pop() : 0;

      // error duration has a wrong format
      if (durationParts.length != 0) {
        throw {
          status: 400,
        };
      }

      let durationData = {hours, minutes, seconds};
      durationUpdated = await DurationsService.updateDuration(durationFound.uuid, durationData);

      // calc recording's total duration
      let recordingTotalDuration = await RecordingsService.calcRecordingTotalDuration(recordingFound.uuid);

      // update recording's total duration
      let recordingOldDuration = await DurationsService.retrieveDuration({recordingUUID: recordingFound.uuid});
      if (!recordingOldDuration) {
        throw {status: 500};
      }

      let recordingDurationUpdated = await DurationsService.updateDuration(recordingOldDuration.uuid, {
        ...recordingTotalDuration,
      });
    }

    res.locals.data = {...trackUpdated.dataValues, duration: durationUpdated || durationFound};
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

    let result = await TracksService.deleteTrack(trackId);

    // calc recording's total duration
    let recordingTotalDuration = await RecordingsService.calcRecordingTotalDuration(recordingFound.uuid);

    // update recording's total duration
    let recordingOldDuration = await DurationsService.retrieveDuration({recordingUUID: recordingFound.uuid});
    if (!recordingOldDuration) {
      throw {status: 500};
    }

    let recordingDurationUpdated = await DurationsService.updateDuration(recordingOldDuration.uuid, {
      ...recordingTotalDuration,
    });

    if (!trackFound) {
      throw {status: 404};
    }

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
