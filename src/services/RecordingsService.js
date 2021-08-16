/* eslint-disable no-useless-catch */
const models = require("../models");
const Op = require("sequelize").Op;

const retrieveRecordings = async () => {
  try {
    let recordings = await models.Recording.findAll({
      include: [{model: models.Track, as: "tracks", include: "duration"}, "duration"],
    });
    return recordings;
  } catch (error) {
    throw error;
  }
};

const createRecording = async (data, artistUUID) => {
  try {
    let newRecording = await models.Recording.create({...data, artistUUID});
    return newRecording;
  } catch (error) {
    throw error;
  }
};

const retrieveRecording = async query => {
  try {
    const foundRecording = await models.Recording.findOne({
      where: query,
      // include: "area",
      include: [{model: models.Track, as: "tracks", include: "duration"}, "duration"],
    });

    return foundRecording;
  } catch (error) {
    throw error;
  }
};

const updateRecording = async (uuid, data) => {
  try {
    const {title} = data;
    const recordingFound = await models.Recording.findOne({
      where: {
        uuid,
      },
    });

    if (!recordingFound) {
      throw {
        status: 404,
      };
    }

    recordingFound.title = title != undefined ? title : recordingFound.title;

    let recordingUpdated = await recordingFound.save();
    return recordingUpdated;
  } catch (error) {
    throw error;
  }
};

const deleteRecording = async uuid => {
  try {
    let res = await models.Recording.destroy({
      where: {uuid: uuid},
    });
    return res;
  } catch (error) {
    throw error;
  }
};

const calcRecordingTotalDuration = async recordingUUID => {
  try {
    // get list of recording's tracks
    let recordingTracksUUID = await models.Track.findAll({attributes: ["uuid"], where: {recordingUUID: recordingUUID}});

    recordingTracksUUID = recordingTracksUUID.map(track => track.uuid);

    let hours = await models.Duration.sum("hours", {where: {trackUUID: {[Op.in]: recordingTracksUUID}}});
    let minutes = await models.Duration.sum("minutes", {where: {trackUUID: {[Op.in]: recordingTracksUUID}}});
    let seconds = await models.Duration.sum("seconds", {where: {trackUUID: {[Op.in]: recordingTracksUUID}}});

    // normalize values of hours, minutes, seconds
    let finalSeconds = seconds % 60;
    let finalMinutes = (Math.floor(seconds / 60) + (minutes % 60)) % 60;
    let finalHours = hours + Math.floor((Math.floor(seconds / 60) + (minutes % 60)) / 60);

    return {
      hours: finalHours,
      minutes: finalMinutes,
      seconds: finalSeconds,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  retrieveRecordings,
  createRecording,
  retrieveRecording,
  updateRecording,
  deleteRecording,
  calcRecordingTotalDuration,
};
