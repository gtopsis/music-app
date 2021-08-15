/* eslint-disable no-useless-catch */
const models = require("../models");

const createDuration = async (data, foreignKey) => {
  try {
    // validate params and body
    const {hours, minutes, seconds} = data;
    const hoursInt = parseInt(hours);
    const minutesInt = parseInt(minutes);
    const secondsInt = parseInt(seconds);

    let finalDuration = {};
    if (!isNaN(hoursInt)) {
      finalDuration.hours = hoursInt;
    } else if (!isNaN(minutesInt)) {
      finalDuration.minutes = minutesInt;
    } else if (!isNaN(secondsInt)) {
      finalDuration.seconds = secondsInt;
    }

    let newDuration = await models.Duration.create({
      ...finalDuration,
      ...foreignKey,
    });

    return newDuration;
  } catch (error) {
    throw error;
  }
};

const retrieveDuration = async query => {
  try {
    const durationFound = await models.Duration.findOne({
      where: query,
    });

    return durationFound;
  } catch (error) {
    throw error;
  }
};

const updateDuration = async (uuid, data) => {
  try {
    const {hours, minutes, seconds} = data;
    const hoursInt = parseInt(hours);
    const minutesInt = parseInt(minutes);
    const secondsInt = parseInt(seconds);

    const durationFound = await models.Duration.findOne({
      where: {
        uuid,
      },
    });

    if (!durationFound) {
      throw {status: 404};
    }

    if (!isNaN(hoursInt)) {
      durationFound.hours = hoursInt;
    }
    if (!isNaN(minutesInt)) {
      durationFound.minutes = minutesInt;
    }
    if (!isNaN(secondsInt)) {
      durationFound.seconds = secondsInt;
    }

    let newDuration = await durationFound.save();
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
