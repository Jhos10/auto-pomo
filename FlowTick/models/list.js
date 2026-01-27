class List {
  constructor() {
    this.listWork = [];
  }

  addWork(work) {
    this.listWork.add(work);
  }

  eliminatedWork(idWork) {
    this.listWork = this.listWord.filter((work) => {
      work.id !== idWork ? true : false;
    });
  }

  getElementById(idWork) {
    for (let i = 0; i < this.listWord.length; i++) {
      if (this.listWork[i].id === idWork) {
        return this.listWord[i];
      }
    }
  }

  loadedStorage() {
    this.listWork = JSON.parse(localStorage.getItem("listWork")) || null;
  }

  saveStorage() {
    localStorage.setItem("listWork", JSON.stringify(this.listWork));
  }
}

const workList = new List();
workList.loadedStorage();

export default workList;
