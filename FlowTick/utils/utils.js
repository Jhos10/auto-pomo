export function normalizeTimeWork(timeWork) {
  let normalizetimeWork = timeWork.split("m")[0];
  return normalizetimeWork + ":00";
}

export function getSystemDate() {
  let systemDate = new Date();
  return systemDate;
}
