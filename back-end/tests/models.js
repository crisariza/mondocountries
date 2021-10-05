const { Countries, Activities, conn } = require("../models");
const { expect } = require("chai");

// resetea bd esto
describe("Activities", () => {
  describe("create", () => {
    it("Debe crear una actividad y devolverla igual", async function () {
      try {
        await Activities.create({
          title: "Walking in the hood",
          difficulty: 4,
          duration: 60,
          season: "Winter",
          cca3: "ARG",
        });
        const activity = await Activities.findOne({
          where: {
            title: "Walking in the hood",
            difficulty: 4,
            duration: 60,
            season: "Winter",
            cca3: "ARG",
          },
        });
        expect(activity.dataValues.title).to.eql("Walking in the hood");
        expect(activity.dataValues.difficulty).to.eql("4");
        expect(activity.dataValues.duration).to.eql("60");
        expect(activity.dataValues.season).to.eql("Winter");
        expect(activity.dataValues.cca3).to.eql("ARG");
      } catch (error) {
        console.log(error);
      }
    });
    it("Debe buscar una actividad por id y devolverla", async function () {
      // uso la actividad creada antes
      try {
        const activity = await Activities.findOne({
          where: {
            activity_id: 1,
          },
        });
        expect(activity.dataValues.title).to.eql("Walking in the hood");
        expect(activity.dataValues.difficulty).to.eql("4");
        expect(activity.dataValues.duration).to.eql("60");
        expect(activity.dataValues.season).to.eql("Winter");
        expect(activity.dataValues.cca3).to.eql("ARG");
      } catch (error) {
        console.log(error);
      }
    });
    it("Debe devolver las actividades", async function () {
      // uso la actividad creada antes
      try {
        const activities = await Activities.findAll({});
        console.log(activities); // opcional en el caso de querer verlas
        expect(activities).to.be.greaterThan(0); // compruebo que no este vacio
      } catch (error) {
        console.log(error);
      }
    });
  });
});
