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
    const {address, city, country, zipCode} = data;

    let newArea = await models.Area.create({
      address,
      zipCode,
      city,
      country,
      artistUUID: artistUuid,
    });

    return newArea;
  } catch (error) {
    throw error;
  }
};

const retrieveArea = async query => {
  try {
    const foundArea = await models.Area.findOne({
      where: query,
    });

    return foundArea;
  } catch (error) {
    throw error;
  }
};

const updateArea = async (uuid, data) => {
  try {
    const {address, city, country, zipCode} = data;
    const foundArea = await models.Area.findOne({
      where: {
        uuid,
      },
    });

    foundArea.address = address != undefined ? address : foundArea.address;
    foundArea.city = city != undefined ? city : foundArea.city;
    foundArea.country = country != undefined ? country : foundArea.country;
    foundArea.zipCode = zipCode != undefined ? zipCode : foundArea.zipCode;

    let newArea = await foundArea.save();
    return newArea;
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
  retrieveArea,
  updateArea,
  deleteArea,
};
