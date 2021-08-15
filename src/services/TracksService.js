/* eslint-disable no-useless-catch */
const models = require("../models");
const Op = require("sequelize").Op;

const retrieveTracks = async () => {
  try {
    let tracks = await models.Track.findAll({
      include: ["duration"],
    });
    return tracks;
  } catch (error) {
    throw error;
  }
};

const createTrack = async (data, recordingUUID) => {
  try {
    const {title, position} = data;
    let newTrack = await models.Track.create({title, position, recordingUUID});
    return newTrack;
  } catch (error) {
    throw error;
  }
};

const retrieveTrack = async query => {
  try {
    const foundTrack = await models.Track.findOne({
      where: query,
      include: ["duration"],
    });

    return foundTrack;
  } catch (error) {
    throw error;
  }
};

const updateTrack = async (uuid, data) => {
  try {
    const {title, position} = data;
    const trackFound = await models.Track.findOne({
      where: {
        uuid,
      },
    });

    if (!trackFound) {
      throw {
        status: 404,
      };
    }

    trackFound.title = title != undefined ? title : trackFound.title;
    trackFound.position = position != undefined ? parseInt(position) : trackFound.position;

    let trackUpdated = await trackFound.save();
    return trackUpdated;
  } catch (error) {
    throw error;
  }
};

const deleteTrack = async uuid => {
  try {
    let res = await models.Track.destroy({
      where: {uuid: uuid},
    });
    return res;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  retrieveTracks,
  createTrack,
  retrieveTrack,
  updateTrack,
  deleteTrack,
};
