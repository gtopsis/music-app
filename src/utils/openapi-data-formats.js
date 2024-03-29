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

        const secondsInt = parseInt(seconds);
        const minutesInt = parseInt(minutes);
        const hoursInt = parseInt(hours);

        if (isNaN(secondsInt) || isNaN(minutesInt) || isNaN(hoursInt)) {
          return false;
        }

        return secondsInt >= 0 && secondsInt < 60 && minutesInt >= 0 && minutesInt < 60 && hoursInt >= 0;
      },
    },
    {
      name: "uuid",
      type: "string",
      validate: v => {
        if (v == undefined || v == null || v == "") return false;

        // Regular expression to check if string is a valid UUID
        const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

        return regexExp.test(v);
      },
    },
  ],
};
