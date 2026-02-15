import Work from "./work.js";

class List {
  constructor() {
    this.listWork = [];
    this.listWorkNulls = null;
    this.getWorksNulls();
  }

  addWork(work) {
    this.listWork.push(work);
    this.saveStorage();
  }

  eliminatedWork(idWork) {
    console.log(idWork);
    this.listWork.forEach((value) => {
      if (value.id === Number(idWork)) {
        console.log("Hey ingreso en el if");
        value.ready = "Eliminated";
      }
    });
    console.log(this.listWork);
    localStorage.setItem("listWork", JSON.stringify(this.listWork));
    return true;
  }

  getElementById(idWork) {
    for (let i = 0; i < this.listWork.length; i++) {
      if (this.listWork[i].id === idWork) {
        return this.listWork[i];
      }
    }
  }

  getFirstItemReadyNull() {
    for (let i = 0; i < this.listWork.length; i++) {
      if (this.listWork[i].ready === null) {
        return this.listWork[i];
      }
    }
    return false;
  }

  getWorksNulls() {
    this.listWorkNulls = this.listWork.filter((work) => {
      return work.ready === null;
    });
    return this.listWorkNulls;
  }

  loadedStorage() {
    this.listWork = JSON.parse(localStorage.getItem("listWork")) || [];
    this.listWork = this.listWork.map(Work.fromJSON);
    this.getWorksNulls();
  }

  saveStorage() {
    localStorage.setItem("listWork", JSON.stringify(this.listWork));
  }

  eliminatedList() {
    this.listWork = [];
    this.getWorksNulls();
    localStorage.clear("listWork");
  }
}

const workList = new List();
workList.loadedStorage();

export default workList;
