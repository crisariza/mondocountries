var express = require("express");
var app = express();
var cors = require("cors");
var pool = require("./db");
var axios = require("axios");
const { bulkScript } = require("./bulkscript.js");
const { API_PORT } = process.env;

//MIDDLEWARE//
app.use(cors());
app.use(express.json());

//ROUTES//

//COUNTRIES NAMES AND CODES
app.get("/countries", async (req, res) => {
  try {
    const countries = await pool.query(
      "SELECT * FROM countries ORDER by country_id"
    );
    res.json(countries.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//COUNTRIES ALPHABET DOWN
app.get("/countries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const countries = await pool.query(
      "SELECT * FROM countries WHERE country_id BETWEEN (25*$1)-24 AND 25*$1 ORDER BY country_id",
      [id]
    );
    if (countries.rows.length === 0) {
      const restcountries = await axios.get(
        "https://restcountries.com/rest/v2/all"
      );
      for (let i = 0; i < restcountries.data.length; i++) {
        let {
          alpha3Code,
          name,
          flag,
          capital,
          region,
          subregion,
          area,
          population,
        } = restcountries.data[i];
        await pool.query(
          "INSERT INTO countries (alpha3code, name, flag, capital, region, subregion, area, population) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
          [alpha3Code, name, flag, capital, region, subregion, area, population]
        );
      }
    }
    res.json(countries.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//COUNTRIES & ACTIVITIES SORT
app.get("/countries/order/:ordertype/:id", async (req, res) => {
  try {
    const { ordertype, id } = req.params;
    var countries = [];
    if (ordertype === "alpdown") {
      countries = await pool.query(
        "SELECT * FROM countries WHERE country_id BETWEEN 250-($1*24)-($1-1) AND 250-(25*($1-1)) ORDER BY country_id DESC",
        [id]
      );
    }
    if (
      ordertype === "africa" ||
      ordertype === "americas" ||
      ordertype === "asia" ||
      ordertype === "europe" ||
      ordertype === "oceania"
    ) {
      countries = await pool.query(
        "SELECT * FROM countries WHERE LOWER(region) = LOWER($1) offset ((25*$2)-25) rows fetch next 25 rows only",
        [ordertype, id]
      );
    }
    if (
      ordertype === "summer" ||
      ordertype === "fall" ||
      ordertype === "winter" ||
      ordertype === "spring"
    ) {
      countries = await pool.query(
        "SELECT DISTINCT country_id, alpha3code, name, flag, capital, region, population FROM countries INNER JOIN activities ON alpha3code = country_alpha3code  WHERE LOWER(alpha3code) = LOWER(alpha3code) AND LOWER(season) = LOWER($1) offset ((25*$2)-25) rows fetch next 25 rows only",
        [ordertype, id]
      );
    }
    res.json(countries.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//COUNTRIES PAGINATE QUANTITY
app.get("/countries/paginate/:ordertype", async (req, res) => {
  try {
    const { ordertype } = req.params;
    var countries = [];
    if (
      ordertype === "africa" ||
      ordertype === "americas" ||
      ordertype === "asia" ||
      ordertype === "europe" ||
      ordertype === "oceania"
    ) {
      countries = await pool.query(
        "SELECT CEILING (COUNT(country_id)/CAST(25 AS float)) as paginate_quantity FROM countries WHERE LOWER(region) = LOWER($1)",
        [ordertype]
      );
    } else if (
      ordertype === "alpdown" ||
      ordertype === "countries" ||
      ordertype === "popdown" ||
      ordertype === "popup"
    ) {
      countries = await pool.query(
        "SELECT CEILING (COUNT(country_id)/CAST(25 AS float)) as paginate_quantity FROM countries"
      );
    }
    res.json(countries.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//GET A COUNTRY
app.get("/country/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const country = await pool.query(
      "SELECT * FROM countries WHERE LOWER(alpha3code) = LOWER($1)",
      [id]
    );
    const activity = await pool.query(
      "SELECT * FROM activities WHERE LOWER(country_alpha3code) LIKE LOWER(CONCAT('%', $1::varchar , '%')) ORDER by activity_id",
      [id]
    );
    res.json({ country: country.rows[0], activities: activity.rows });
  } catch (err) {
    console.log(err.message);
  }
});

//SEARCH COUNTRIES
app.get("/countries/search/:search", async (req, res) => {
  try {
    const { search } = req.params;
    const country = await pool.query(
      "SELECT * FROM countries WHERE LOWER(name) LIKE LOWER(CONCAT('%', $1::varchar , '%')) ORDER by country_id",
      [search]
    );
    res.json(country.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//GET ALL ACTIVITIES
app.get("/activities", async (req, res) => {
  try {
    const activities = await pool.query(
      "SELECT * FROM activities ORDER by activity_id"
    );
    res.json(activities.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//GET AN ACTIVITY
app.get("/activity/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await pool.query(
      "SELECT * FROM activities WHERE activity_id = $1",
      [id]
    );
    res.json(activity.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//POST AN ACTIVITY
app.post("/addactivity", async (req, res) => {
  try {
    const { title, difficulty, duration, season, countries } = req.body;
    const activity = await pool.query(
      "INSERT INTO activities (title, difficulty, duration, season, country_alpha3code) VALUES ($1, $2, $3, $4, $5);",
      [title, difficulty, duration, season, countries]
    );
    console.log(activity);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(process.env.PORT || API_PORT, () => {
  console.log(`Server has started on port ${process.env.PORT || API_PORT}`);
  bulkScript();
});
