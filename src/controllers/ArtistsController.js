const ArtistsService = require("../services/ArtistsService");
const AreasService = require("../services/AreasService");
const models = require("../models");
const Op = require("sequelize").Op;

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
    const {city, address, country, zipCode} = area;

    const artistFound = await models.Artist.findOne({
      where: {
        shortName,
      },
    });

    if (artistFound) {
      throw {status: 409};
    }

    let artistData = {name, shortName, gender};
    let newArtist = await ArtistsService.createArtist(artistData);

    let areaData = {city, address, country, zipCode};
    let newArea = await AreasService.createArea(areaData, newArtist.uuid);

    res.locals.data = {...newArtist.dataValues, area: newArea};
    next();
  } catch (error) {
    next(error);
  }
};

const retrieveArtist = async (req, res, next) => {
  try {
    // validate params and body
    const uuid = req.params.artistId;
    const artistFound = await ArtistsService.retrieveArtist({uuid});

    if (!artistFound) {
      throw {status: 404};
    }

    res.locals.data = artistFound;
    next();
  } catch (error) {
    next(error);
  }
};

const updateArtist = async (req, res, next) => {
  try {
    // validate params and body
    const uuid = req.params.artistId;
    const {name, shortName, gender, area} = req.body;
    const {city, address, country, zipCode} = area;

    const artistFound = await ArtistsService.retrieveArtist({uuid});

    if (!artistFound) {
      throw {status: 404};
    }

    // check if new shortName is already occupied by someone else
    const artistWithSameShortName = await ArtistsService.retrieveArtist({
      uuid: {[Op.ne]: uuid},
      shortName,
    });

    if (artistWithSameShortName) {
      throw {status: 409};
    }

    let artistData = {name, shortName, gender};
    let artistUpdated = await ArtistsService.updateArtist(uuid, artistData);

    // update area details
    let areaData = {city, address, country, zipCode};
    let areaFound = await AreasService.retrieveArea({artistUUID: artistFound.uuid});
    if (areaFound) {
      let areaUpdated = await AreasService.updateArea(areaFound.uuid, areaData);
    }

    res.locals.data = artistUpdated;
    next();
  } catch (error) {
    next(error);
  }
};

const deleteArtist = async (req, res, next) => {
  try {
    // validate params and body
    const uuid = req.params.artistId;
    const artistFound = await ArtistsService.retrieveArtist({uuid});

    if (!artistFound) {
      throw {status: 404};
    }

    let result = await ArtistsService.deleteArtist(uuid);

    res.locals.status = 204;
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
