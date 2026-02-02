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
    this.listWork = this.listWord.filter((work) => {
      work.id !== idWork ? true : false;
    });
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
}

const workList = new List();
workList.loadedStorage();

export default workList;
