import workList from "../models/list.js";

function renderList() {
  const htmlAcumulator = `
  <div class="container-tasks">
    <h3>Active Tasks</h3>
    <p class="number-works">3</p>
  </div>`;
  workList.listWork.forEach((work) => {
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

function handlerAddWorkDialog() {
  const buttonAddWork = document.querySelector(".btn-show-add");
  const dialogAddWork = document.querySelector(".add-work-dialog");
  const buttonCancelDialog = document.querySelector(".cancel-add-work");
  if (!buttonAddWork || !dialogAddWork || !buttonCancelDialog) return;
  buttonAddWork.addEventListener("click", () => dialogAddWork.showModal());
  buttonCancelDialog.addEventListener("click", () => dialogAddWork.close());
  dialogAddWork.addEventListener("click", (event) => {
    if (event.target === dialogAddWork) {
      dialogAddWork.close();
    }
  });
}

export function renderPage() {
  if (workList.listWork === null) {
    const cartMain = document.querySelector(".cointainer-work-main");
    const listWorkDOM = document.querySelector(".container-list-work");
    cartMain.innerHTML = "Don't have Works";
    listWorkDOM.remove();
  } else {
    renderList();
    renderWorkMain();
  }
  handlerAddWorkDialog();
}
