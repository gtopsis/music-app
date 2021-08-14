/* eslint-disable no-useless-catch */
const Artist = require("../models2/Artist");
const Area = require("../models2/Area");

const retrieveArtists = async data => {
  try {
    // validate params and body
    let artists = await Artist.findAll({
      model: Area,
      as: "area",
    });

    return artists;
  } catch (error) {
    throw error;
  }
};

const createArtist = async data => {
  try {
    // validate params and body
    const {name, shortName, gender, area} = data;
    let newArtist = await Artist.create({name, shortName, gender});

    // let newArea = await Area.create({address: "a", zipCode: "a", city: "a", country: "a"});
    // console.log("🚀 ~ file: ArtistsService.js ~ line 32 ~ newArtist", newArea);

    // newArtist.setArea(newArea);
    // return newArtist;
    return {};
  } catch (error) {
    console.log("🚀 ~ file: ArtistsService.js ~ line 39 ~ error", error);
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
