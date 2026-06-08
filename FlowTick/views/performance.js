import workList from "../models/list.js";
const container_stadistics = document.querySelector(".main-container");
// Calculo de variables globales de la lista
const worksCompleted = workList.calculateWorksComplete();
const worksIncompleted = workList.calculateWorksIncompleted();
const worksDeleted = workList.calculateWorksDeleted();
const listWorksImcompleted = workList.getListWorksIncompleted();
const listWorksCompleted = workList.getListWorksCompleted();
const listWorksDropped = workList.getListWorksDroppeds();
function configureSectionDatas() {
  const total_focus = (document.querySelector(".p-data").innerHTML =
    `${workList.listWork.length} Sessions`);
  const calcuta_completion = (worksCompleted / workList.listWork.length) * 100;
  const completion = (document.querySelector(".p-complete").innerHTML =
    `${calcuta_completion.toFixed(2)}%`);
  const dropped = (document.querySelector(".p-dropped").innerHTML =
    `${worksDeleted} Sessions`);
  const investedTime = workList.calculateTimeInvested();
  console.log(investedTime);
  const time_invested = (document.querySelector(".p-data-invested").innerHTML =
    `${investedTime}h`);
}

function configureSectionWorksDropped() {
  const section_works_dropped = document.querySelector(
    ".section-works-dropped",
  );
  let acumulatorHtlm = `            <div class="information-session">
              <img src="../images/cancelar.png" class="symbol-config" alt="" />
              <p class="p-information">DROPPED SESSIONS</p>
              <p class="special-p-dropped p-information">${worksDeleted} Sessions</p>
            </div>`;
  for (let i = 0; i < listWorksDropped.length; i++) {
    acumulatorHtlm += `            <div class="box-session">
              <div>
                <p class="name-activity">${workList.listWork[i].name}</p>
                <p class="time-activity">${workList.listWork[i].timer}</p>
              </div>
              <img
                src="../images/tres-puntos.png"
                class="symbol-config"
                alt=""
              />
            </div>`;
  }
  section_works_dropped.innerHTML = acumulatorHtlm;
  console.log(section_works_dropped);
}

function configureSectionWorksCompleted() {
  console.log(workList.getListWorksCompleted());
  console.log(workList.getListWorksDroppeds());
  console.log(workList.getListWorksIncompleted());
  const section_works_completed = document.querySelector(
    ".section-works-completed",
  );
  let acumulatorHtlm = `            <div class="information-session">
              <img src="../images/cheque.png" class="symbol-config" alt="" />
              <p class="p-information">COMPLETED</p>
              <p class="special-p-completed p-information">${worksCompleted} Sessions</p>
            </div>`;
  for (let i = 0; i < listWorksCompleted.length; i++) {
    acumulatorHtlm += `            <div class="box-session">
              <div>
                <p class="name-activity">${workList.listWork[i].name}</p>
                <p class="time-activity">${workList.listWork[i].timer}</p>
              </div>
              <img
                src="../images/tres-puntos.png"
                class="symbol-config"
                alt=""
              />
            </div>`;
  }
  section_works_completed.innerHTML = acumulatorHtlm;
}

function structurePage() {
  // container_stadistics.innerHTML = "";
  configureSectionDatas();
  configureSectionWorksDropped();
  configureSectionWorksCompleted();
}

function performanceConfigure() {
  if (workList.listWork.length === 0) {
    container_stadistics.innerHTML =
      "<p class = 'advertisment-any-activity'>In this moment you aren't having stadistic to see";
  } else {
    structurePage();
  }
}

performanceConfigure();
