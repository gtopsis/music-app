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

    if (!foundArtist) {
      throw {status: 404};
    }
    return foundArtist;
  } catch (error) {
    throw error;
  }
};

const updateArtist = async data => {
  try {
    // validate params and body
  } catch (error) {
    throw error;
  }
};

const deleteArtist = async data => {
  try {
    // validate params and body
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
