/* eslint-disable no-useless-catch */
const models = require("../models");

const retrieveArtists = async data => {
  try {
    // validate params and body

    let artists = await models.Artist.findAll({include: "area"});

    // let areas = await models.Area.findAll({include: [models.Artist]});
    // console.log("🚀 ~ file: ArtistsService.js ~ line 10 ~ areas", artists);
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

const retrieveArtistByUUID = async uuid => {
  try {
    const foundArtist = await models.Artist.findOne({
      where: {
        uuid,
      },
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
    let res = await models.Artist.update({
      where: {name, shortName, gender, area},
    });
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
  retrieveArtistByUUID,
  updateArtist,
  deleteArtist,
};
