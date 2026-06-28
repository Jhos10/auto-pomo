import Work from "./work.js";

export class List {
  constructor(listWork = []) {
    this.listWork = listWork;
    this.listWorkNulls = null;
    this.getWorksNulls();
  }

  // Add new work

  addWork(time, name_work) {
    let work = new Work(name_work, this.listWork.length, time);
    this.listWork.push(work);
    this.saveStorage();
    return work.create_date.toLocaleDateString("es-ES");
  }

  // ELiminate work

  eliminatedWork(idWork) {
    this.listWork.forEach((value) => {
      if (value.id === Number(idWork)) {
        value.ready = "Eliminated";
      }
    });
    localStorage.setItem("listWork", JSON.stringify(this.listWork));
    return true;
  }

  // Getters

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

  // Manage of local storage

  loadedStorage() {
    this.listWork = JSON.parse(localStorage.getItem("listWork")) || [];
    this.listWork = this.listWork.map(Work.fromJSON);
    this.getWorksNulls();
  }

  saveStorage() {
    localStorage.setItem("listWork", JSON.stringify(this.listWork));
  }

  static fromJSON(string_list_Work) {
    let list_works = string_list_Work.listWork;
    let list_work_original = new List(list_works);
    list_work_original.listWork = list_work_original.listWork.map(
      Work.fromJSON,
    );
    return list_work_original;
  }

  eliminatedList() {
    this.listWork = [];
    this.getWorksNulls();
    localStorage.clear("listWork");
  }

  // Getters

  getListWorksCompleted() {
    const list_works_completed = workList.listWork.filter((work) =>
      work.ready === "completed" ? true : false,
    );
    return list_works_completed;
  }

  getListWorksIncompleted() {
    const list_works_incompleted = workList.listWork.filter((work) =>
      work.ready === "incompleted" ? true : false,
    );
    return list_works_incompleted;
  }

  getListWorksDroppeds() {
    const list_works_dropped = workList.listWork.filter((work) => {
      work.ready === "deleted" ? true : false;
    });

    return list_works_dropped;
  }

  calculateWorksComplete() {
    let countWorksReady = 0;
    for (let i = 0; i < this.listWork.length; i++) {
      if (this.listWork[i].ready === "completed") {
        countWorksReady += 1;
      }
    }
    return countWorksReady;
  }

  calculateWorksIncompleted() {
    let countWorksIncompleted = 0;
    for (let i = 0; i < this.listWork.length; i++) {
      if (this.listWork[i].ready === "incompleted") {
        countWorksIncompleted += 1;
      }
    }
    return countWorksIncompleted;
  }
  calculateWorksDeleted() {
    let countWorksDeleted = 0;
    for (let i = 0; i < this.listWork.length; i++) {
      if (this.listWork[i].ready === "deleted") {
        countWorksDeleted += 1;
      }
    }
    return countWorksDeleted;
  }

  calculateTimeInvested() {
    let countTimer = 0;
    for (let i = 0; i < this.listWork.length; i++) {
      if (this.listWork[i].ready === "completed") {
        const [minutes, seconds] = this.listWork[i].time.split(":").map(Number);
        const hours = minutes / 60 + seconds / 3600;
        countTimer += hours;
      }
    }
    // Redondear al final
    countTimer = Number(countTimer.toFixed(2));
    console.log(countTimer);
    return countTimer;
  }
}

export const workList = new List();
workList.loadedStorage();

// export let workList;
