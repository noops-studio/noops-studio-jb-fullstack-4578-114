import { start } from "./src/app";
import sequelize from "./src/db/sequelize";

// jest.setTimeout(10000);

beforeAll(async () => {
  await start();
});

beforeEach(async () => {
  await sequelize.sync({ alter: false }); // Reset the database before each test suite
});

afterAll(async () => {
  await sequelize.close();
});
