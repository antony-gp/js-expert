export default class Person {
  constructor({ id, vehicles, distanceTraveled, distanceUnit, from, to }) {
    this.id = id;
    this.vehicles = vehicles;
    this.distanceTraveled = distanceTraveled;
    this.distanceUnit = distanceUnit;
    this.from = from;
    this.to = to;
  }

  format(lang) {
    const mapDate = (dateStr) => {
      const [year, month, date] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, date);
    };

    return {
      id: Number(this.id),
      vehicles: new Intl.ListFormat(lang, {
        style: "long",
        type: "conjunction",
      }).format(this.vehicles),
      distanceTraveled: new Intl.NumberFormat(lang, {
        style: "unit",
        unit: { imperial: "mile", metric: "kilometer" }[this.distanceUnit],
      }).format(this.distanceTraveled),
      from: new Intl.DateTimeFormat(lang, {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(mapDate(this.from)),
      to: new Intl.DateTimeFormat(lang, {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(mapDate(this.to)),
    };
  }

  static parseFromText(text) {
    const EMPTY_SPACE = " ";

    const [id, vehicles, distanceTraveled, distanceUnit, from, to] =
      text.split(EMPTY_SPACE);

    return new Person({
      id: Number(id),
      vehicles: vehicles.split(","),
      distanceTraveled: Number(distanceTraveled),
      distanceUnit,
      from,
      to,
    });
  }
}
