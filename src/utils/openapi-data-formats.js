module.exports = {
  formats: [
    {
      name: "duration",
      type: "string",
      validate: v => {
        if (v == undefined || v == null || v == "") return false;

        let durationParts = v.split(":");
        if (durationParts.length < 1 || durationParts.length > 3) return false;

        const seconds = durationParts.length != 0 ? durationParts.pop() : 0;
        const minutes = durationParts.length != 0 ? durationParts.pop() : 0;
        const hours = durationParts.length != 0 ? durationParts.pop() : 0;

        if (
          seconds == "" ||
          seconds.trim() == "" ||
          isNaN(seconds) ||
          minutes == "" ||
          minutes.trim() == "" ||
          isNaN(minutes) ||
          hours == "" ||
          hours.trim() == "" ||
          isNaN(hours)
        ) {
          return false;
        }

        const secondsInt = parseInt(seconds);
        const minutesInt = parseInt(minutes);
        const hoursInt = parseInt(hours);

        return secondsInt >= 0 && secondsInt < 60 && minutesInt >= 0 && minutesInt < 60 && hoursInt >= 0;
      },
    },
  ],
};
