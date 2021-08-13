const ArtistsService = require("../services/ArtistsService");
const Artist = require("../models/Artist");

const retrieveArtists = async (req, res, next) => {
  try {
    // validate params and body

    let artists = await ArtistsService.retrieveArtists();
    res.locals.data = artists;
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

    if (foundArtist) {
      throw {status: 400};
    }

    let newArtist = await Artist.create({name, shortName, gender});
    res.locals.data = newArtist;
    next();
  } catch (error) {
    next(error);
  }
};

const retrieveArtist = async (req, res, next) => {
  try {
    // validate params and body
    const uuid = req.params.artistId;
    const foundArtist = await ArtistsService.retrieveArtistByUUID(uuid);

    if (!foundArtist) {
      throw {status: 404};
    }

    res.locals.data = foundArtist;
    next();
  } catch (error) {
    next(error);
  }
};

const updateArtist = async (req, res, next) => {
  try {
    // validate params and body
    const uuid = req.params.artistId;
    const foundArtist = await ArtistsService.retrieveArtistByUUID(uuid);

    if (!foundArtist) {
      throw {status: 404};
    }

    next();
  } catch (error) {
    next(error);
  }
};

const deleteArtist = async (req, res, next) => {
  try {
    // validate params and body
    const uuid = req.params.artistId;
    const foundArtist = await ArtistsService.retrieveArtistByUUID(uuid);

    if (!foundArtist) {
      throw {status: 404};
    }

    res.status = 204;
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
