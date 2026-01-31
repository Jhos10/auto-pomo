export function normalizeTimeWork(timeWork) {
  let normalizetimeWork = timeWork.split("m")[0];
  return normalizetimeWork + ":00";
}
