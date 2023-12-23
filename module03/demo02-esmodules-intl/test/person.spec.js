import mocha from "mocha";
import chai from "chai";
import Person from "../src/person.js";

const { describe, it } = mocha;
const { expect } = chai;

describe("Person", () => {
  it("should parse person from string", () => {
    const input = "3 Bike,Boat,Plane 20000000 metric 1996-04-30 2023-09-16";

    const person = Person.parseFromText(input);

    expect(person).to.be.deep.equal({
      id: 3,
      vehicles: ["Bike", "Boat", "Plane"],
      distanceTraveled: 20000000,
      distanceUnit: "metric",
      from: "1996-04-30",
      to: "2023-09-16",
    });
  });

  it("should format person by given locale", () => {
    const person = new Person({
      id: 3,
      vehicles: ["SUV", "Car", "Motorcycle"],
      distanceTraveled: 20000000,
      distanceUnit: "imperial",
      from: "1996-04-30",
      to: "2023-09-16",
    });

    expect(person.format("pt-Br")).to.be.deep.equal({
      id: 3,
      vehicles: "SUV, Car e Motorcycle",
      distanceTraveled: "20.000.000 mi",
      from: "30 de abril de 1996",
      to: "16 de setembro de 2023",
    });
  });
});
