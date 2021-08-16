const recordings = {
  recordingWithCompleteData: {
    title: "My personal album",
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
