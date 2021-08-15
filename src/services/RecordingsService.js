/* eslint-disable no-useless-catch */
const models = require("../models");
const Op = require("sequelize").Op;

const retrieveRecordings = async () => {
  try {
    let recordings = await models.Recording.findAll({include: ["tracks"]});
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
      include: ["tracks"],
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

    recordingFound.title = title;

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

module.exports = {
  retrieveRecordings,
  createRecording,
  retrieveRecording,
  updateRecording,
  deleteRecording,
};
