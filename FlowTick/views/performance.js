// import { Chart } from "chart.js";
// import workList from "../models/list.js";
import { schedule_user } from "../models/Schedule.js";
const workList = schedule_user.getDateWorks();
schedule_user.loadadSchedule();
// console.log(workList);
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
  const time_invested = (document.querySelector(".p-data-invested").innerHTML =
    `${investedTime}h`);
}

function generate_grafics(information, type_grafic = "session") {
  let grafics = document.querySelector("#grafic-performance");
  new Chart(grafics, {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "number of completed works",
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
        },
        {
          label: "number of dropped works",
          data: [4, 5, 2, 4, 1, 0],
        },
        {
          label: "number of incompleted works",
          data: [4, 6, 7, 8, 9, 1],
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
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
}

function configureSectionWorksCompleted() {
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

function handlers() {
  const time_container = document.querySelector(".filters-time-container");
  time_container.addEventListener("click", (event) => {
    let date_stadistic = document.querySelector(".js-input-date");
    date_stadistic = date_stadistic === "" ? "" : date_stadistic;
    if (event.target.value === "Day") {
      if (date_stadistic) console.log(event.target.value);
    } else if (event.target.value === "Week") {
      console.log(event.target.value);
    } else if (event.target.value === "Month") {
      console.log(event.target.value);
    }
    console.log(event.target);
  });
}

function structurePage() {
  configureSectionDatas();
  configureSectionWorksDropped();
  configureSectionWorksCompleted();
  generate_grafics();
  handlers();
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
