// import { useImperativeHandle } from "react";
import {
  getSystemDate,
  normalizeDateToDate,
  getFirstDayMonth,
  getLastDayMonth,
} from "../utils/utils.js";
import { List } from "./list.js";
import Work from "./work.js";
export class Schedule {
  constructor() {
    // Se guardara en un json el cual tendra por clave el formato mes-año y el valor sera el objeto lista
    this.works_lists = {};
  }

  // Agregar un nuevo trabajo
  addWorks(time, name_work, date = getSystemDate()) {
    // Acceder a la fecha de la primera tarea en formato es-Es y convertirlo en un arreglo.
    const date_created_normalize = date.toLocaleDateString("es-ES").split("/");
    // Normalizar fecha.
    let date_created = `${date_created_normalize[1]}-${date_created_normalize[2]}`;
    // Guardar fecha en el atributo works_lists.
    // Si la clave esta indefinida agregar una lista con el objeto list dentro que se paso en el parametro de la funcion
    // Si no se accede a la lita que se tiene asignada en la respectiva clave del json

    if (
      Object.keys(this.works_lists).length === 0 ||
      this.works_lists[date_created] === undefined
    ) {
      const list_works = new List();
      list_works.addWork(time, name_work);
      this.works_lists[date_created] = [list_works];
    } else {
      const list_works = this.getDayList(
        date_created_normalize[0],
        this.works_lists[date_created],
      );
      console.log(list_works);
      if (list_works === undefined) {
        const list_work = new List();
        list_work.addWork(time, name_work);
        this.works_lists[date_created].push(list_work);
      } else {
        list_works.addWork(time, name_work);
      }
    }
    this.saveWorkList();
    return true;
  }

  // Eliminar una lista de trabajos
  eliminatedList(workRerenfece) {
    const date_array = workRerenfece.listWork[0].create_date
      .toLocaleDateString("es-ES")
      .split("/");
    const date = `${date_array[1]}-${date_array[2]}`;
    const day = date_array[0];
    // Sacar lista
    let list = this.works_lists[date];
    const { list_works, index } = this.getIndex(list, day);
    list_works.eliminatedList();
    const elements_removed = list.splice(index, 1);
    // Necesito verificar cuantos elementos quedaron en el mes.
    // Si quedan mas de un elemento se eliminar
    // this.saveWorkList();
  }

  // Eliminar el schedule
  eliminatedSchedule() {
    this.workList = {};
    localStorage.clear();
    return true;
  }

  // Obtener todo el schedule
  getWorkLists() {
    return this.works_lits;
  }

  getDateWorks(date = getSystemDate()) {
    const date_array =
      date instanceof Date
        ? date.toLocaleDateString("es-ES").split("/")
        : date.split("/");
    date = `${date_array[1]}-${date_array[2]}`;
    // console.log(this.works_lists[date]);
    const list_work =
      Object.keys(this.works_lists).length > 0
        ? this.getDayList(date_array[0], this.works_lists[date])
        : [];

    // console.log(list_work);
    return list_work;
  }

  getIndex(list_work, day) {
    for (let i = 0; i < list_work.length; i++) {
      let day_work = list_work[i].listWork[0].create_date
        .toLocaleDateString("es-ES")
        .split("/");
      if (day === day_work[0]) {
        return { list_works: list_work[i], index: i };
      }
    }
  }

  // Guaradar el schedule
  saveWorkList() {
    localStorage.setItem("schedule", JSON.stringify(this.works_lists));
  }

  loadadSchedule() {
    this.works_lists = JSON.parse(localStorage.getItem("schedule")) || {};
    if (Object.keys(this.works_lists).length > 0) {
      for (let date of Object.keys(this.works_lists)) {
        this.works_lists[date] = this.works_lists[date].map(List.fromJSON);
      }
      let first_work = this.getDateWorks();
    }
  }

  getDayList(number_day, list_month) {
    if (list_month !== undefined) {
      const numberDay = Number(number_day);
      for (let i = 0; i < list_month.length; i++) {
        let day = Number(
          list_month[i].listWork[0].create_date
            .toLocaleDateString("es-ES")
            .split("/")[0],
        );
        // console.log(number_day, day);
        if (day === numberDay) {
          return list_month[i];
        }
      }
    } else {
      return undefined;
    }
  }

  getWeekList(date, list_works_months) {
    let [year_date, month_date, day_date] = date.split("-");
    // console.log(year_date, month_date);
    const first_day_month = getFirstDayMonth(year_date, month_date);
    const last_day_month = getLastDayMonth(year_date, month_date);
    // console.log(first_day_month, last_day_month);
    // console.log(date);
    const date_normalized = normalizeDateToDate(date);
    const number_day = date_normalized.getDay();
    // console.log(date_normalized, number_day);
    let list_days = [];
    let countDays = 0;
    let day = [];
    let check = true;
    // let dayreferences = this.getDayList();
    if (
      date_normalized.getDate() <= last_day_month.getDate() &&
      date_normalized.getDate() >= last_day_month.getDate() - 6 &&
      date_normalized.toLocaleDateString("es-ES", {
        weekday: "long",
      }) !== "lunes"
    ) {
      let date_second_list_month =
        this.works_lists[`${Number(month_date) + 1}-${year_date}`];
      list_works_months = [...list_works_months, ...date_second_list_month];
    } else if (
      date_normalized.getDate() <= 7 &&
      date_normalized.getDate() >= 1 &&
      date_normalized.toLocaleDateString("es-ES", {
        weekday: "long",
      }) !== "lunes"
    ) {
      let date_second_list_month =
        this.works_lists[`${Number(month_date) - 1}-${year_date}`];
      list_works_months = [...date_second_list_month, ...list_works_months];
    }
    // Primero mirar si la semana esta partida por dos meses, si esta partida en dos meses.
    while (true) {
      // Recorrer el arreglo de schedule la cual tiene en cada posicion el objeto lista.

      let list_work = list_works_months[countDays];
      if (list_work === undefined && check === false) {
        return list_days;
      } else if (list_work === undefined && check === true) {
        break;
      }
      let date_complete = list_work.listWork[0].create_date.getDay();
      let day = list_work.listWork[0].create_date.day;
      // Agregar el objeto list en  al list_days.
      list_days.push(list_work);
      // Si la fecha concide con la buscada se cambiara la variable check a falso.
      if (date_complete === date) {
        check = false;
      }
      // se verificara que el numero del dia de la tarea que esta guardada en listado sea 6 si la tarea es 6 y esta la variable de chech en falso se rompera el brak.
      // si la tarea tiene el numero de 6 pero la variable sigue en true se limpiara toda la variable list_days.
      if (day === 6 && check == false) {
        break;
      } else if (day === 6 && check) {
        check = true;
        list_days = [];
      }
      countDays += 1;
      // date += 1;
    }
    list_days = list_days;
    return list_days;
  }

  getMonthList(date) {
    // Agregar variable que guarde las semanas, la cual seria una lista de listas.
    // console.log(date);
    // console.log(this.works_lists[date]);
    let list_weeks = [];
    // Agregar variable contadora de semanas para cuando sean cuatro ya se borre la semana
    let count_weeks = 1;
    let count_days = 1;
    let list_days_week = [];
    // Hacer un blucle infinito con la finalidad de encontrar cada semana del mes
    while (true) {
      // Descubrir el primer dia agendado en el mes, tomar la referencia y crear la nueva fecha con el primer dia encontrado
      if (this.works_lists[date][count_days] === undefined) {
        list_weeks.push(list_days_week);
        break;
      }
      if (
        this.works_lists[date][count_days].listWork[0].create_date.getDate() ===
          0 &&
        count_weeks === 4
      ) {
        list_weeks.push(list_days_week);
        break;
      } else if (
        this.works_lists[date][count_days].listWork[0].create_date.getDate() ===
        0
      ) {
        list_weeks.push(list_days_week);
        count_weeks += 1;
      }

      list_days_week.push(this.works_lists[date][count_days]);
      count_days += 1;
      // Agregar la lista retornada por la funcion en la variable list_weeks
      // Acceder al ultimo dia de la lista que retorna la función y guardarla en la variable y sumarle mas uno, este numero sera el referente para crear la nueva fecha.
    }
    console.log(list_weeks);
    return list_weeks;
  }
}

export let schedule_user = new Schedule();
schedule_user.loadadSchedule();
