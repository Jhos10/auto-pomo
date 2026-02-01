import {
  handlerAddWorkDialog,
  loadedEventsMainPage,
  renderPage,
} from "./listView.js";

function initPage() {
  handlerAddWorkDialog();
  renderPage();
  loadedEventsMainPage();
}

initPage();
