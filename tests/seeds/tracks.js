const tracks = {
  trackWithCompleteData: {
    title: "Track 1",
    position: 1,
    duration: "3:43",
  },

  trackWithCompleteData2: {
    title: "Track 2",
    position: 2,
    duration: "1:33",
  },

  trackWithMissingTitle: {
    position: 2,
    duration: "1:33",
  },

  trackWithMissingPosition: {
    title: "Track 2",
    duration: "1:33",
  },

  trackWithMissingDuration: {
    title: "Track 2",
    position: 2,
  },

  trackUpdateTitle: {
    title: "Favorite track",
    // position: 2
  },

  trackWithOccupiedTitle: {
    title: "Track 1",
    position: 2,
    duration: "0:56",
  },

  trackWithEmptyTitle: {
    title: "",
    position: 2,
    duration: "0:56",
  },

  trackWithInvalidPosition: {
    title: "Jeremy",
    position: -1,
    duration: "0:56",
  },

  trackWithInvalidDuration: {
    title: "Jeremy",
    position: 3,
    duration: "",
  },

  trackUnknown: {uuid: "123e4567-e89b-12d3-a456-426614174001"},

  trackWithInvalidUUID: {uuid: "123e4567-e89b-12d3-a456"},
};

module.exports = tracks;
