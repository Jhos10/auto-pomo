import { getSystemDate } from "../utils/utils.js";

class Work {
  ready = null;
  constructor(
    name,
    lenList,
    time,
    ready = null,
    create_date = getSystemDate(),
  ) {
    this.name = name;
    this.id = lenList;
    this.time = time;
    this.ready = ready;
    this.timer = time;
    this.create_date = create_date;
    this.finished_date;
  }

  isReady() {
    this.ready === null ? (this.ready = "completed") : (this.ready = null);
    this.finished_date = getSystemDate();
    return this.ready;
  }

  isIncompleted() {
    this.ready = "incompleted";
    this.finished_date = getSystemDate();
    return this.ready;
  }

  isDropped() {
    this.ready = "dropped";
    this.finished_date = getSystemDate();
    return this.ready;
  }

  static fromJSON(work) {
    const convertedWork = new Work(
      work.name,
      work.id,
      work.time,
      work.ready,
      new Date(work.create_date),
    );
    return convertedWork;
  }

  returnTimerOriginalValue() {
    this.timer = this.time;
  }
}

export default Work;
