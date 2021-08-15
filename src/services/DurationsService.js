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

const retrieveDuration = async query => {
  try {
    const foundDuration = await models.Duration.findOne({
      where: query,
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

module.exports = {
  createDuration,
  retrieveDuration,
  updateDuration,
};
