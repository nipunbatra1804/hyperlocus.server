require("dotenv").config();

const request = require("supertest");
const app = require("../../app");

const { Place, Tag } = require("../../models");
const createFoodOptions = require("../seed/seedFoodOptions");

describe("/FoodOptions", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await createFoodOptions();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("[Get] FoodOptions", () => {
    test("should return a list of all FoodOptions", async done => {
      const res = await request(app)
        .get("/places")
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
        .get("/places")
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
        .get("/places")
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
        .get("/places")
        .query({
          loc: { coord: [103.955419467871, 1.3214476908532] },
          distance: 28800
        })
        .expect("content-type", /json/)
        .expect(200);

      let foodOptions = res.body;
      foodOptions = foodOptions.map(food => food.name);

      console.log(foodOptions);

      done();
    });
  });
  describe("[Post] options", () => {
    const crs = { type: "name", properties: { name: "EPSG:4326" } };
    const dummyItem = {
      category: "Food",
      name: "OrangeYLemon",
      type: "restaurant",
      address: "32 Cross Street",
      postalCode: 48432
    };

    test("should add a rest with NO tags", async () => {
      const res = await request(app)
        .post("/places")
        .send({ foodOption: dummyItem })
        .expect(201);

      const newFoodOption = res.body;

      expect(newFoodOption).toEqual(expect.objectContaining(dummyItem));
    });

    test("should add a rest with tags", async done => {
      dummyItem.tags = [{ name: "japanese" }, { name: "healthier" }];
      const res = await request(app)
        .post("/places")
        .send({ foodOption: dummyItem })
        .expect(201);

      const newFoodOption = res.body;
      let tags = newFoodOption.tags.map(tag => tag.name);
      expect(tags).toEqual(expect.arrayContaining(["japanese", "healthier"]));
      done();
    });
  });

  describe("[Patch] foodOptions ", () => {
    test("should be able to edit a field in a particular Food Option", async () => {
      const { id } = await Place.findOne({ where: { name: "subway" } });

      await request(app)
        .patch(`/places/${id}`)
        .send({ openingTime: "06:00" })
        .expect(202);

      const foundBook = await Place.findOne({ where: { name: "subway" } });

      expect(foundBook).toEqual(
        expect.objectContaining({ openingTime: "06:00:00" })
      );
    });
    test("should be able to add new Tags to an existing Food Option", async () => {
      const { id } = await Place.findOne({ where: { name: "subway" } });

      await request(app)
        .patch(`/places/${id}`)
        .send({ tags: ["westenr"] })
        .expect(202);

      const foundBook = await Place.findOne({ where: { name: "subway" } });

      expect(foundBook).toEqual(
        expect.objectContaining({ openingTime: "06:00:00" })
      );
    });
  });
});
