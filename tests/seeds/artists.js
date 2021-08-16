const artists = {
  artistWithCompleteData: {
    name: "George",
    shortName: "gtop",
    gender: "male",
    area: {
      address: "Ikarou 21",
      city: "Ioannina",
      country: "Greece",
      zipCode: "71300",
    },
  },

  artistWithCompleteData2: {
    name: "Maria",
    shortName: "plemenou",
    gender: "female",
    area: {
      address: "Ikarou 21",
      city: "Ioannina",
      country: "Greece",
      zipCode: "71300",
    },
  },

  artistWithMissingGender: {
    name: "Maria",
    shortName: "mary",
    area: {
      address: "Ikarou 21",
      city: "Ioannina",
      country: "Greece",
      zipCode: "71300",
    },
  },

  artistWithMissingName: {
    shortName: "John",
    gender: "female",
    area: {
      address: "Ikarou 21",
      city: "Ioannina",
      country: "Greece",
      zipCode: "71300",
    },
  },

  artistWithMissingShortName: {
    name: "Kostas",
    gender: "male",
    area: {
      address: "Ikarou 21",
      city: "Ioannina",
      country: "Greece",
      zipCode: "71300",
    },
  },

  artistWithMissingArea: {
    name: "Lampros",
    shortName: "lamp",
    gender: "male",
  },

  artistWithMissingAddress: {
    name: "Kaity",
    shortName: "kat",
    gender: "female",
    area: {
      city: "Ioannina",
      country: "Greece",
      zipCode: "71300",
    },
  },

  artistWithMissingCity: {
    name: "Jeremy",
    shortName: "jerem",
    gender: "male",
    area: {
      address: "Ikarou 21",
      country: "Greece",
      zipCode: "71300",
    },
  },

  artistWithMissingCountry: {
    name: "Mano",
    shortName: "man",
    gender: "male",
    area: {
      address: "Ikarou 21",
      city: "Ioannina",
      zipCode: "71300",
    },
  },

  artistWithMissingZipCode: {
    name: "Helen",
    shortName: "hell",
    gender: "female",
    area: {
      address: "Ikarou 21",
      city: "Ioannina",
      country: "Greece",
    },
  },

  artistUpdateName: {
    name: "Georgios Topsis",
  },

  artistWithOccupiedShortName: {
    name: "Hellen",
    shortName: "gtop",
  },

  artistWithEmptyName: {
    name: "",
    shortName: "enemi",
  },

  artistWithEmptyShortName: {
    name: "Jeremy",
    shortName: "",
  },

  artistUnknown: {uuid: "123e4567-e89b-12d3-a456-426614174001"},

  artistWithInvalidUUID: {uuid: "123e4567-e89b-12d3-a456"},
};

module.exports = artists;
