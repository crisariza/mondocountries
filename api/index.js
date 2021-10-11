let express = require("express");
let server = express();
let cors = require("cors");
let db = require("./db");
const { bulkScript } = require("./bulkscript.js");
const { API_PORT } = process.env;

server.use(cors());
server.use(express.json());

// GET ALL COUNTRIES
server.get("/countries", async (req, res) => {
  try {
    const countries = await db.query(
      "SELECT * FROM countries ORDER by country_id"
    );
    res.json(countries.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// COUNTRIES ALPHABET DOWN
server.get("/countries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const countries = await db.query(
      "SELECT * FROM countries WHERE country_id BETWEEN (25*$1)-24 AND 25*$1 ORDER BY country_id",
      [id]
    );
    res.json(countries.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// COUNTRIES & ACTIVITIES SORT
server.get("/countries/order/:ordertype/:id", async (req, res) => {
  try {
    const { ordertype, id } = req.params;
    let countries = [];
    if (ordertype === "alpdown") {
      countries = await db.query(
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
      countries = await db.query(
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
      countries = await db.query(
        "SELECT DISTINCT country_id, cca3, name, flag, capital, region, population FROM countries INNER JOIN activities ON cca3 = cca3  WHERE LOWER(cca3) = LOWER(cca3) AND LOWER(season) = LOWER($1) offset ((25*$2)-25) rows fetch next 25 rows only",
        [ordertype, id]
      );
    }
    res.json(countries.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// COUNTRIES PAGINATE QUANTITY
server.get("/countries/paginate/:ordertype", async (req, res) => {
  try {
    const { ordertype } = req.params;
    let countries = [];
    if (
      ordertype === "africa" ||
      ordertype === "americas" ||
      ordertype === "asia" ||
      ordertype === "europe" ||
      ordertype === "oceania"
    ) {
      countries = await db.query(
        "SELECT CEILING (COUNT(country_id)/CAST(25 AS float)) as paginate_quantity FROM countries WHERE LOWER(region) = LOWER($1)",
        [ordertype]
      );
    } else if (
      ordertype === "alpdown" ||
      ordertype === "countries" ||
      ordertype === "popdown" ||
      ordertype === "popup"
    ) {
      countries = await db.query(
        "SELECT CEILING (COUNT(country_id)/CAST(25 AS float)) as paginate_quantity FROM countries"
      );
    }
    res.json(countries.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// GET A COUNTRY
server.get("/country/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const country = await db.query(
      "SELECT * FROM countries WHERE LOWER(cca3) = LOWER($1)",
      [id]
    );
    const activity = await db.query(
      "SELECT * FROM activities WHERE LOWER(cca3) LIKE LOWER(CONCAT('%', $1::letchar , '%')) ORDER by activity_id",
      [id]
    );
    res.json({ country: country.rows[0], activities: activity.rows });
  } catch (err) {
    console.log(err.message);
  }
});

// SEARCH COUNTRIES
server.get("/countries/search/:search", async (req, res) => {
  try {
    const { search } = req.params;
    const country = await db.query(
      "SELECT * FROM countries WHERE LOWER(name) LIKE LOWER(CONCAT('%', $1::letchar , '%')) ORDER by country_id",
      [search]
    );
    res.json(country.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// GET ALL ACTIVITIES
server.get("/activities", async (req, res) => {
  try {
    const activities = await db.query(
      "SELECT * FROM activities ORDER by activity_id"
    );
    res.json(activities.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// GET AN ACTIVITY
server.get("/activity/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await db.query(
      "SELECT * FROM activities WHERE activity_id = $1",
      [id]
    );
    res.json(activity.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// POST AN ACTIVITY
server.post("/addactivity", async (req, res) => {
  try {
    const { title, difficulty, duration, season, countries } = req.body;
    const activity = await db.query(
      "INSERT INTO activities (title, difficulty, duration, season, cca3) VALUES ($1, $2, $3, $4, $5);",
      [title, difficulty, duration, season, countries]
    );
    console.log(activity);
  } catch (err) {
    console.log(err.message);
  }
});

server.listen(API_PORT, () => {
  console.log(`Server has started on port ${API_PORT}`);
  bulkScript();
});
