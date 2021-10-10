/* eslint-disable no-unused-expressions */

var supertest = require("supertest-as-promised")(require("../index"));
var expect = require("chai").expect;

describe("Routes", function () {
  describe("/countries", function () {
    it("GET responde con paises", function () {
      return supertest
        .get("/countries")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).to.not.eql([]); // debe llegar un array con todos los paises
          expect(res.body.length).to.eql(250); // hay 250 paises
        });
    });
  });
  describe("/countries/order/europe/1", function () {
    it("GET responde con paises del orden", function () {
      return supertest
        .get("/countries/order/europe/1")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          var orderTrue = [];
          var paginateTrue = [];
          for (let i = 0; i < res.body.length; i++) {
            orderTrue.push(res.body[i].region === "Europe");
            paginateTrue.push(res.body[i]);
          }
          expect(orderTrue.length).to.eql(25); // debe llegar un array con paises de los primeros 25 paises (modificable hasta 10 segun el numero pasado) que esten en europa (valido para continentes y estaciones del año, donde respondera un pais que tenga una actividad ahi)
          expect(paginateTrue.length).to.eql(25); // son 25 en el paginado
        });
    });
  });
  describe("/countries/paginate/europe", function () {
    // es la cantidad de paises divida 25 y redondeada al numero posterior:
    it("GET responde con la cantidad de paginado de europa", function () {
      return supertest
        .get("/countries/paginate/europe")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body.paginate_quantity).to.eql(3); // Europa (57 / 25) = 2.28 = 3 (por el redondeo)
        });
    });
    it("GET responde con la cantidad de paginado de asia", function () {
      return supertest
        .get("/countries/paginate/asia")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body.paginate_quantity).to.eql(2); // Asia (50 / 25) = 2
        });
    });
    it("GET responde con la cantidad de paginado de oceania", function () {
      return supertest
        .get("/countries/paginate/oceania")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body.paginate_quantity).to.eql(2); // Oceania (27 / 25) = 1.08 = 2 (por el redondeo)
        });
    });
    it("GET responde con la cantidad de paginado de america", function () {
      return supertest
        .get("/countries/paginate/americas")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body.paginate_quantity).to.eql(3); // America (57 / 25) = 2.28 = 3 (por el redondeo)
        });
    });
    it("GET responde con la cantidad de paginado de africa", function () {
      return supertest
        .get("/countries/paginate/africa")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body.paginate_quantity).to.eql(3); // Africa (60 / 25) = 2.4 = 3 (por el redondeo)
        });
    });
  });
});
