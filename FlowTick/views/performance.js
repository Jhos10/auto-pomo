// import { Chart } from "chart.js";
// import workList from "../models/list.js";
import { schedule_user } from "../models/Schedule.js";
schedule_user.loadadSchedule();
const workList = schedule_user.getDateWorks();
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

function make_dict_information(
  labels,
  number_complete_works,
  number_incompleted_works,
  number_deleted_workds,
) {
  return {
    labels: labels,
    number_complete_works: [number_complete_works],
    number_incompleted_works: [number_incompleted_works],
    number_deleted_workds: [number_deleted_workds],
  };
}

function generate_datas(datas) {
  const labels = [
    ...new Map(
      datas.listWork.map((work) => [
        work.create_date.toLocaleDateString("es-ES"),
        work.create_date.toLocaleDateString("es-ES"),
      ]),
    ).values(),
  ];
  const number_complete_works = datas.calculateWorksComplete();
  const number_incompleted_works = datas.calculateWorksIncompleted();
  const number_deleted_workds = datas.calculateWorksDeleted();
  return make_dict_information(
    labels,
    number_complete_works,
    number_incompleted_works,
    number_deleted_workds,
  );
}

let myChart;
function generateGraficsDay(datas, type_grafic = "session") {
  if (myChart) myChart.destroy();
  const dict_information = generate_datas(datas);
  let grafics = document.querySelector("#grafic-performance");
  myChart = new Chart(grafics, {
    type: "bar",
    data: {
      labels: dict_information.labels,
      datasets: [
        {
          label: "number of completed works",
          data: dict_information.number_complete_works,
          borderWidth: 1,
        },
        {
          label: "number of dropped works",
          data: dict_information.number_deleted_workds,
        },
        {
          label: "number of incompleted works",
          data: dict_information.number_incompleted_works,
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
  return myChart;
}

function generateGraficsWeek(datas, type_grafic = "session") {
  if (myChart) myChart.destroy();
  const array_information_data = datas.map((list_works) => {
    return generate_datas(list_works);
  });
  const labels = array_information_data.map((information_day) => {
    return information_day.labels[0];
  });
  const days_completed = array_information_data.map((information_day) => {
    return information_day.number_complete_works[0];
  });
  const days_dropped = array_information_data.map((information_day) => {
    return information_day.number_deleted_workds[0];
  });
  const days_incompleted = array_information_data.map((information_day) => {
    return information_day.number_incompleted_works[0];
  });

  let grafics = document.querySelector("#grafic-performance");
  myChart = new Chart(grafics, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "number of completed works",
          data: days_completed,
          borderWidth: 1,
        },
        {
          label: "number of dropped works",
          data: days_dropped,
        },
        {
          label: "number of incompleted works",
          data: days_incompleted,
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
  return myChart;
}

function generateGraficsMonth(datas, type_grafic = "session") {
  if (myChart) myChart.destroy();
  console.log(datas);
  const labels = ["week 1", "week 2", "week 3", "week 4"];
  const information_weeks = [[], [], [], []];
  console.log(datas);
  for (let i = 0; i < 4; i++) {
    if (datas[i] !== undefined) {
      const information_week = datas[i].map((list_work) => {
        return generate_datas(list_work);
      });
      information_weeks[i] = information_week;
    }
  }
  console.log(information_weeks);
  // let grafics = document.querySelector("#grafic-performance");
  // myChart = new Chart(grafics, {
  //   type: "bar",
  //   data: {
  //     labels: labels,
  //     datasets: [
  //       {
  //         label: "number of completed works",
  //         data: days_completed,
  //         borderWidth: 1,
  //       },
  //       {
  //         label: "number of dropped works",
  //         data: days_dropped,
  //       },
  //       {
  //         label: "number of incompleted works",
  //         data: days_incompleted,
  //       },
  //     ],
  //   },
  //   options: {
  //     scales: {
  //       y: {
  //         beginAtZero: true,
  //       },
  //     },
  //   },
  // });
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
  function conditionalInputTime(time_container) {
    if (time_container === "") {
      return false;
    } else {
      return time_container.value;
    }
  }

  function settingsTime(date) {
    const date_array = date.split("-");
    const date_month_year = `${Number(date_array[1])}-${date_array[0]}`;
    const date_day = date_array[2];
    return { day: Number(date_day), month_yer: date_month_year };
  }
  const time_container = document.querySelector(".filters-time-container");
  time_container.addEventListener("click", (event) => {
    let date_stadistic = document.querySelector(".js-input-date");
    date_stadistic = date_stadistic === "" ? "" : date_stadistic;
    const result_conditional_time = conditionalInputTime(date_stadistic);
    if (event.target.value === "Day") {
      if (result_conditional_time !== false) {
        const { day, month_yer } = settingsTime(result_conditional_time);
        const list_month = schedule_user.works_lists[month_yer];
        const list_work = schedule_user.getDayList(day, list_month);
        myChart = generateGraficsDay(list_work);
      } else {
      }
    } else if (event.target.value === "Week") {
      if (result_conditional_time !== false) {
        const { day, month_yer } = settingsTime(result_conditional_time);
        const list_month = schedule_user.works_lists[month_yer];
        const list_work_month = schedule_user.getWeekList(
          result_conditional_time,
          list_month,
        );
        generateGraficsWeek(list_work_month);
      } else {
      }
    } else if (event.target.value === "Month") {
      if (result_conditional_time !== false) {
        const { day, month_yer } = settingsTime(result_conditional_time);
        const list_works = schedule_user.getMonthList(month_yer);
        // generateGraficsMonth(list_works);
      }
      // console.log(event.target.value);
    }
    // console.log(event.target);
  });
}

function structurePage() {
  configureSectionDatas();
  configureSectionWorksDropped();
  configureSectionWorksCompleted();
  // generate_grafics();
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
