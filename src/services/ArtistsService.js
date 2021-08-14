/* eslint-disable no-useless-catch */
const Artist = require("../models/Artist");

const retrieveArtists = async data => {
  try {
    // validate params and body
    let artists = await Artist.findAll();
    return artists;
  } catch (error) {
    throw error;
  }
};

const createArtist = async data => {
  try {
    // validate params and body
    const {name, shortName, gender} = data;
    let artist = await Artist.create({name, shortName, gender});
    return artist;
  } catch (error) {
    throw error;
  }
};

const retrieveArtistByUUID = async uuid => {
  try {
    const foundArtist = await Artist.findOne({
      where: {
        uuid,
      },
    });

    return foundArtist;
  } catch (error) {
    throw error;
  }
};

const updateArtist = async (uuid, data) => {
  try {
    const {name, shortName, gender, area} = data;
    let res = await Artist.update({
      where: {name, shortName, gender, area},
    });
  } catch (error) {
    throw error;
  }
};

const deleteArtist = async uuid => {
  try {
    let res = await Artist.destroy({
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
