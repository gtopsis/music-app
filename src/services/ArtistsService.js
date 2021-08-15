/* eslint-disable no-useless-catch */
const models = require("../models");
const Op = require("sequelize").Op;

const retrieveArtists = async () => {
  try {
    let artists = await models.Artist.findAll({include: "area"});
    return artists;
  } catch (error) {
    throw error;
  }
};

const createArtist = async data => {
  try {
    // validate params and body
    const {name, shortName, gender, area} = data;
    let newArtist = await models.Artist.create({name, shortName, gender});
    return newArtist;
  } catch (error) {
    throw error;
  }
};

const retrieveArtist = async query => {
  try {
    const foundArtist = await models.Artist.findOne({
      where: query,
      include: "area",
    });

    return foundArtist;
  } catch (error) {
    throw error;
  }
};

const updateArtist = async (uuid, data) => {
  try {
    const {name, shortName, gender, area} = data;
    const artistFound = await models.Artist.findOne({
      where: {
        uuid,
      },
    });

    if (!artistFound) {
      throw {
        status: 404,
      };
    }

    artistFound.name = name;
    artistFound.shortName = shortName;
    artistFound.gender = gender;

    let artistUpdated = await artistFound.save();
    return artistUpdated;
  } catch (error) {
    throw error;
  }
};

const deleteArtist = async uuid => {
  try {
    let res = await models.Artist.destroy({
      where: {uuid: uuid},
    });
    return res;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  retrieveArtists,
  createArtist,
  retrieveArtist,
  updateArtist,
  deleteArtist,
};
