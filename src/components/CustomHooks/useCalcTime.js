export default function useCalcTime(timeInit) {
  const milliseconds = timeInit.toMillis();
  const millisecondsNow = Date.now();
  const agoSec = Math.round((millisecondsNow - milliseconds) / 1000);
  const agoMinute = Math.round(agoSec / 60);
  const agoHour = Math.round(agoMinute / 60);
  const agoDay = Math.round(agoHour / 24);

  if (agoDay >= 7) {
    return ``;
  } else if (agoDay >= 1) {
    return `about ${agoDay} day`;
  } else if (agoHour >= 1) {
    return `about ${agoHour} hour`;
  } else if (agoMinute >= 1) {
    return `about ${agoMinute} minute`;
  } else if (agoSec >= 1) {
    return `about few seconds`;
  } else {
    return `about few seconds`;
  }
}
