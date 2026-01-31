import workList from "../models/list.js";
import Work from "../models/work.js";
import { normalizeTimeWork } from "../utils/utils.js";
function renderList() {
  console.log(workList.listWork);
  let htmlAcumulator = `
  <div class="container-tasks">
    <h3>Active Tasks</h3>
    <p class="number-works">${workList.listWork.length}</p>
  </div>`;
  workList.listWork.forEach((work, index) => {
    if (index !== 0)
      htmlAcumulator += `
      <div class="container-work-item-list">
        <label class="checkbox-wrapper">
          <input type="checkbox" />
          <span class="custom-checkbox"></span>
        </label>
        <div class="container-work-information">
          <p class="name-pomo">${work.name}</p>
          <div class="container-other-information">
            <p class="id-pomo">#Pomo${work.id}</p>
            <p class="time-pomo">
              <img src="../images/alarm.png" alt="" height="12px" />${work.time}m
            </p>
          </div>
        </div>
      </div>
    `;
  });
  const containerListWork = document.querySelector(".container-list-work");
  containerListWork.innerHTML = htmlAcumulator;
}

function renderWorkMain() {
  const mainWork = workList.getElementById(0);
  const mainWorkDOM = document.querySelector(".cointainer-work-main");
  mainWorkDOM.innerHTML = `
    <p class="text-light current-session">CURRENT SESSION: ${mainWork.name}</p>
    <p class="time-p">${mainWork.time}</p>
    <div class="container-button-control">
      <button class="button-work-main">
        <img src="../images/return.png" alt="" height="16px" />
      </button>
      <button class="button-main">START</button>
      <button class="button-work-main">
        <img src="../images/next-pomo.png" alt="" height="16px" />
      </button>
    </div>
    <p class="text-light motivation-sentence">
      *The only way to do great work is to love what you do*
      </p>
      `;
}

function selectedNewWorkTime(btnElement = null, classAdd, classReferences) {
  const btnsOptionsTime = document.querySelectorAll(classReferences);
  for (let i = 0; i < btnsOptionsTime.length; ++i) {
    btnsOptionsTime[i].classList.remove(classAdd);
  }
  btnElement !== null ? btnElement.classList.add(classAdd) : null;
}

function getInformationNewWork() {
  const nameNewWork = document.querySelector(".js-name-work-input").value;
  const timeNewWork = document.querySelector(".btn-selected-time").innerHTML;
  return {
    nameNewWork: nameNewWork,
    lenList:
      workList.listWork.length === undefined ? 1 : workList.listWork.length,
    timeNewWork: normalizeTimeWork(timeNewWork),
  };
}

export function handlerAddWorkDialog() {
  const buttonShowDialog = document.querySelector(".btn-show-add");
  const dialogAddWork = document.querySelector(".add-work-dialog");
  const buttonCancelDialog = document.querySelector(".cancel-add-work");
  const buttonAddWork = document.querySelector(".js-btn-add-work");
  if (
    !buttonShowDialog ||
    !dialogAddWork ||
    !buttonCancelDialog ||
    !buttonAddWork
  )
    return;
  buttonShowDialog.addEventListener("click", () => dialogAddWork.showModal());
  buttonCancelDialog.addEventListener("click", () => dialogAddWork.close());
  buttonAddWork.addEventListener("click", () => {
    console.log("EXECUTE FUNCTION");
    const { nameNewWork, lenList, timeNewWork } = getInformationNewWork();
    const newWork = new Work(nameNewWork, lenList, timeNewWork);
    workList.addWork(newWork);
    renderPage();
  });
  dialogAddWork.addEventListener("click", (event) => {
    if (event.target === dialogAddWork) {
      dialogAddWork.close();
    } else if (event.target.classList.contains("option-button-time")) {
      selectedNewWorkTime(
        event.target,
        "btn-selected-time",
        ".option-button-time",
      );
    }
  });
}

export function renderPage() {
  const cartMain = document.querySelector(".cointainer-work-main");
  const listWorkDOM = document.querySelector(".container-list-work");
  if (workList.listWork.length === 0) {
    cartMain.innerHTML = "Don't have Works";
    listWorkDOM.style.display = "none";
  } else {
    workList.loadedStorage();
    listWorkDOM.style.display = "flex";
    renderWorkMain();
    renderList();
  }
}
