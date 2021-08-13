const ArtistsService = require("../services/ArtistsService");
const Artist = require("../models/Artist");

const retrieveArtists = async (req, res, next) => {
  try {
    // validate params and body

    res.locals.status = 200;
    next();
  } catch (error) {
    next(error);
  }
};

const createArtist = async (req, res, next) => {
  try {
    // validate params and body
    const {name, shortName, gender, area} = req.body;
    const foundArtist = await Artist.findOne({
      where: {
        shortName,
      },
    });

    next();
  } catch (error) {
    next(error);
  }
};

const retrieveArtist = async (req, res, next) => {
  try {
    // validate params and body

    next();
  } catch (error) {
    next(error);
  }
};

const updateArtist = async (req, res, next) => {
  try {
    // validate params and body

    next();
  } catch (error) {
    next(error);
  }
};

const deleteArtist = async (req, res, next) => {
  try {
    // validate params and body

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  retrieveArtists,
  createArtist,
  retrieveArtist,
  updateArtist,
  deleteArtist,
};
