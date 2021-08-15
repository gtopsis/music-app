/* eslint-disable no-useless-catch */
const models = require("../models");
const Op = require("sequelize").Op;

const retrieveRecordings = async () => {
  try {
    let recordings = await models.Recording.findAll({include: ["artist" /*'tracks'*/]});
    return recordings;
  } catch (error) {
    throw error;
  }
};

const createRecording = async (title, artistUUID) => {
  try {
    // validate params and body
    let newRecording = await models.Recording.create({title, artistUUID});
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
      include: ["artist" /*'tracks'*/],
    });

    return foundRecording;
  } catch (error) {
    throw error;
  }
};

const updateRecording = async (uuid, data) => {
  try {
    const {name, shortName, gender, area} = data;
    const RecordingFound = await models.Recording.findOne({
      where: {
        uuid,
      },
    });

    if (!RecordingFound) {
      throw {
        status: 404,
      };
    }

    RecordingFound.name = name;
    RecordingFound.shortName = shortName;
    RecordingFound.gender = gender;

    let RecordingUpdated = await RecordingFound.save();
    return RecordingUpdated;
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
