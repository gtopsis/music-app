const recordings = {
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

  recordingWithCompleteData: {
    title: "My personal album",
  },

  recordingWithMissingGender: {
    name: "Maria",
    shortName: "mary",
    area: {
      address: "Ikarou 21",
      city: "Ioannina",
      country: "Greece",
      zipCode: "71300",
    },
  },

  recordingWithMissingName: {
    shortName: "John",
    gender: "female",
    area: {
      address: "Ikarou 21",
      city: "Ioannina",
      country: "Greece",
      zipCode: "71300",
    },
  },

  recordingWithMissingShortName: {
    name: "Kostas",
    gender: "male",
    area: {
      address: "Ikarou 21",
      city: "Ioannina",
      country: "Greece",
      zipCode: "71300",
    },
  },

  recordingWithMissingArea: {
    name: "Lampros",
    shortName: "lamp",
    gender: "male",
  },

  recordingWithMissingAddress: {
    name: "Kaity",
    shortName: "kat",
    gender: "female",
    area: {
      city: "Ioannina",
      country: "Greece",
      zipCode: "71300",
    },
  },

  recordingWithMissingCity: {
    name: "Jeremy",
    shortName: "jerem",
    gender: "male",
    area: {
      address: "Ikarou 21",
      country: "Greece",
      zipCode: "71300",
    },
  },

  recordingWithMissingCountry: {
    name: "Mano",
    shortName: "man",
    gender: "male",
    area: {
      address: "Ikarou 21",
      city: "Ioannina",
      zipCode: "71300",
    },
  },

  recordingWithMissingZipCode: {
    name: "Helen",
    shortName: "hell",
    gender: "female",
    area: {
      address: "Ikarou 21",
      city: "Ioannina",
      country: "Greece",
    },
  },

  recordingUpdateTitle: {
    title: "My second favorite album",
  },

  recordingWithOccupiedTitle: {
    title: "My personal album",
  },

  recordingWithEmptyTitle: {
    title: "",
  },

  recordingUnknown: {uuid: "123e4567-e89b-12d3-a456-426614174001"},

  recordingWithInvalidUUID: {uuid: "123e4567-e89b-12d3-a456"},
};

module.exports = recordings;
