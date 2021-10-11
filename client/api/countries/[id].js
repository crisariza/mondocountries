let db = require("../db");

module.exports = async (req, res) => {
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
};
