class Work {
  ready = null;
  constructor(name, lenList, time) {
    this.name = name;
    this.id = lenList;
    this.time = time;
    // this.ready = null;
  }

  isReady() {
    this.ready === null ? (this.ready = true) : (this.ready = null);
    return this.ready;
  }
}

export default Work;
