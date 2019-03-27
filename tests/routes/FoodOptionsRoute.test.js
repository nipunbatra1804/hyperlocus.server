require("dotenv").config();

const request = require("supertest");
const app = require("../../app");

const { FoodOption, Tag } = require("../../models");
const createFoodOptions = require("../seed/seedFoodOptions");

describe("/FoodOptions", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await createFoodOptions();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("Get requests", () => {
    test("should return a list of all FoodOptions", async done => {
      const res = await request(app)
        .get("/food")
        .expect(200);

      let foodOptions = res.body;
      foodOptions = foodOptions.map(food => food.name);

      expect(foodOptions).toEqual(
        expect.arrayContaining(["Pizza Hut", "rice garden", "Sushi Tei"])
      );

      done();
    });
    test("should return a specific restaurant with certain tags", async done => {
      //sushi tei, healthier, japanese
      const res = await request(app)
        .get("/food")
        .query({ name: "Sushi Tei" })
        .expect("content-type", /json/)
        .expect(200);

      let foodOptions = res.body;
      expect(foodOptions[0]).toEqual(
        expect.objectContaining({ name: "Sushi Tei" })
      );

      let tags = foodOptions[0].tags.map(tag => tag.name);
      expect(tags).toEqual(expect.arrayContaining(["japanese", "healthier"]));

      done();
    });
    test("should return restaurants with specific tags", async done => {
      //sushi tei, healthier, japanese
      const res = await request(app)
        .get("/food")
        .query({ tag: ["healthier", "cheap"] })
        .expect("content-type", /json/)
        .expect(200);

      let foodOptions = res.body;
      foodOptions = foodOptions.map(food => food.name);

      expect(foodOptions).toEqual(
        expect.arrayContaining(["subway", "Sushi Tei"])
      );

      done();
    });
    test("should return restaurants close to a certain location", async done => {
      const res = await request(app)
        .get("/food")
        .query({
          location: { coord: [103.955419467871, 1.3214476908532] }
        })
        .expect("content-type", /json/)
        .expect(200);

      let foodOptions = res.body;
      foodOptions = foodOptions.map(food => food.name);

      console.log(foodOptions);

      done();
    });
  });
});
