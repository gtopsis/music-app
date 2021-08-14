/* eslint-disable no-useless-catch */
const models = require("../models");

const retrieveAreas = async data => {
  try {
  } catch (error) {
    throw error;
  }
};

const createArea = async (data, artistUuid) => {
  try {
    // validate params and body
    const {name, shortName, gender, area} = data;

    let newArea = await models.Area.create({
      address: "a",
      zipCode: "a",
      city: "a",
      country: "a",
      artistUUID: artistUuid,
    });

    // newmodels.Area.setArea(newArea);
    return newArea;
  } catch (error) {
    throw error;
  }
};

const retrieveAreaByUUID = async uuid => {
  try {
    const foundArea = await models.Area.findOne({
      where: {
        uuid,
      },
    });

    return foundArea;
  } catch (error) {
    throw error;
  }
};

const updateArea = async (uuid, data) => {
  try {
    const {name, shortName, gender, area} = data;
    // let res = await models.Area.update({
    //   where: {name, shortName, gender, area},
    // });
  } catch (error) {
    throw error;
  }
};

const deleteArea = async uuid => {
  try {
    let res = await models.Area.destroy({
      where: {uuid: uuid},
    });
    return res;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  retrieveAreas,
  createArea,
  retrieveAreaByUUID,
  updateArea,
  deleteArea,
};
