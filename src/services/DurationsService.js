/* eslint-disable no-useless-catch */
const models = require("../models");

const createDuration = async (data, foreignKey) => {
  try {
    // validate params and body
    const {hours, minutes, seconds} = data;

    let newDuration = await models.Duration.create({
      hours: parseInt(hours),
      minutes: parseInt(minutes),
      seconds: parseInt(seconds),
      ...foreignKey,
    });

    return newDuration;
  } catch (error) {
    throw error;
  }
};

const retrieveDurationByUUID = async uuid => {
  try {
    const foundDuration = await models.Duration.findOne({
      where: {
        uuid,
      },
    });

    return foundDuration;
  } catch (error) {
    throw error;
  }
};

const updateDuration = async (uuid, data) => {
  try {
    const {hours, minutes, seconds} = data;
    const foundDuration = await models.Duration.findOne({
      where: {
        uuid,
      },
    });

    foundDuration.hours = parseInt(hours);
    foundDuration.minutes = parseInt(minutes);
    foundDuration.seconds = parseInt(seconds);

    let newDuration = await foundDuration.save();
    return newDuration;
  } catch (error) {
    throw error;
  }
};

const deleteDuration = async uuid => {
  try {
    let res = await models.Duration.destroy({
      where: {uuid: uuid},
    });
    return res;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createDuration,
  retrieveDurationByUUID,
  updateDuration,
  deleteDuration,
};
