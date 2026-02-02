class Work {
  ready = null;
  constructor(name, lenList, time, ready = null) {
    this.name = name;
    this.id = lenList;
    this.time = time;
    this.ready = ready;
    this.timer = time;
  }

  isReady() {
    this.ready === null ? (this.ready = "completed") : (this.ready = null);

    return this.ready;
  }

  isIncompleted() {
    this.ready = "incompleted";
  }

  static fromJSON(work) {
    const convertedWork = new Work(work.name, work.id, work.time, work.ready);
    return convertedWork;
  }

  returnTimerOriginalValue() {
    this.timer = this.time;
  }
}

export default Work;
