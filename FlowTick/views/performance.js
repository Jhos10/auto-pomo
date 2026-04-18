const container_stadistics = document.querySelector(".main-container");

function structurePage() {
  container_stadistics.innerHTML = "";
}

function performanceConfigure() {
  console.log(container_stadistics);
  if (container_stadistics.innerHTML === "") {
    container_stadistics.innerHTML =
      "<p class = 'advertisment-any-activity'>In this moment you aren't having stadistic to see";
  } else {
  }
}

performanceConfigure();
