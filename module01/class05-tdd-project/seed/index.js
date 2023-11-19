const { writeFile } = require("fs/promises");
const { join } = require("path");
const { fakerPT_BR: faker } = require("@faker-js/faker");
const { CarCategoryEntity, CarEntity, UserEntity } = require("../src/entities");

const databaseFolder = join(__dirname, "../", "database");
const ITEMS_AMOUNT = 3;

const users = Array.apply(undefined, { length: ITEMS_AMOUNT }).map(() => {
  return new UserEntity({
    id: faker.string.uuid(),
    name: faker.person.firstName().concat(" ", faker.person.lastName()),
    document: faker.helpers.fromRegExp(/[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}/),
    age: faker.number.int({ min: 18, max: 80 }),
  });
});

const carCategories = Array.apply(undefined, { length: ITEMS_AMOUNT }).map(
  () => {
    return new CarCategoryEntity({
      id: faker.string.uuid(),
      name: faker.vehicle.type(),
      price: +faker.finance.amount(20, 100, 2),
    });
  }
);

const cars = [];

for (const carCategory of carCategories) {
  carCategory.carIds = Array.apply(undefined, { length: ITEMS_AMOUNT }).map(
    () => {
      const car = new CarEntity({
        id: faker.string.uuid(),
        name: faker.vehicle.model(),
        brand: faker.vehicle.manufacturer(),
        releaseYear: faker.date.past({ years: 10 }).getFullYear(),
        manual: !!+faker.number.binary(),
        traction: faker.helpers.arrayElement(["FWD", "RWD", "AWD"]),
        fuelType: faker.vehicle.fuel(),
        available: !!+faker.number.binary(),
      });

      cars.push(car);

      return car.id;
    }
  );
}

const write = async (filename, data) =>
  writeFile(join(databaseFolder, filename), JSON.stringify(data, null, 2));

(async () => {
  await write("users.json", users);
  await write("cars.json", cars);
  await write("car-categories.json", carCategories);
})();
