class Work {
  ready = null;
  constructor(name, lenList, time) {
    this.name = name;
    this.id = lenList;
    this.time = time;
    this.ready = null;
    this.timer = time;
  }

  isReady() {
    this.ready === null ? (this.ready = true) : (this.ready = null);

    return this.ready;
  }

  static fromJSON(work) {
    const convertedWork = new Work(work.name, work.id, work.time);
    return convertedWork;
  }

  returnTimerOriginalValue() {
    this.timer = this.time;
  }
}

export default Work;
