const convertHoursMinutesToSeconds = (hours: number, minutes: number): number => {
  const hoursInSeconds = hours * 3600;
  const minutesInSeconds = minutes * 60;
  const totalSeconds = hoursInSeconds + minutesInSeconds;
  return totalSeconds;
}

const Utils = {
  convertHoursMinutesToSeconds
};

export default Utils;