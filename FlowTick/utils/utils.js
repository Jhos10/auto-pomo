export function normalizeTimeWork(timeWork) {
  let normalizetimeWork = timeWork.split("m")[0];
  return normalizetimeWork + ":00";
}

// Funtion for getting a currently date
export function getSystemDate() {
  let systemDate = new Date();
  return systemDate;
}

// Funtion for translate date to object date
export function normalizeDateToDate(date) {
  let objectDate = new Date(date);
  return objectDate;
}
