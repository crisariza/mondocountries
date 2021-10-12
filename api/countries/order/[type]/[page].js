let db = require("../../../db");

module.exports = async (req, res) => {
  try {
    const { type, page } = req.query;
    let countries = [];
    let countriesLength = 0;

    if (type === "alpdown") {
      countries = await db.query(
        "SELECT * FROM countries WHERE country_id BETWEEN 250-($1*24)-($1-1) AND 250-(25*($1-1)) ORDER BY country_id DESC",
        [page]
      );
      countriesLength = await db.query(
        "SELECT CEILING (COUNT(country_id)/CAST(25 AS float)) FROM countries"
      );
    } else if (type === "alpup") {
      countries = await db.query(
        "SELECT * FROM countries WHERE country_id BETWEEN (25*$1)-24 AND 25*$1 ORDER BY country_id",
        [id]
      );
      countriesLength = await db.query(
        "SELECT CEILING (COUNT(country_id)/CAST(25 AS float)) FROM countries"
      );
    } else if (
      type === "africa" ||
      type === "americas" ||
      type === "asia" ||
      type === "europe" ||
      type === "oceania"
    ) {
      countries = await db.query(
        "SELECT * FROM countries WHERE LOWER(region) = LOWER($1) offset ((25*$2)-25) rows fetch next 25 rows only",
        [type, page]
      );
      countriesLength = await db.query(
        "SELECT CEILING (COUNT(country_id)/CAST(25 AS float)) FROM countries WHERE LOWER(region) = LOWER($1)",
        [type]
      );
    } else if (
      type === "summer" ||
      type === "fall" ||
      type === "winter" ||
      type === "spring"
    ) {
      countries = await db.query(
        "SELECT * FROM countries INNER JOIN activities ON cca3 = cca3  WHERE LOWER(cca3) = LOWER(cca3) AND LOWER(season) = LOWER($1) offset ((25*$2)-25) rows fetch next 25 rows only",
        [type, page]
      );
      countriesLength = await db.query(
        "SELECT CEILING (COUNT(activity_id)/CAST(25 AS float)) FROM activities WHERE LOWER(season) = LOWER($1)",
        [type]
      );
    }

    res.json(
      countries
        ? {
            countries: countries.rows,
            paginate_quantity: countriesLength.rows[0],
          }
        : { message: "Countries not found." }
    );
  } catch (err) {
    res.json({ error: err.message });
  }
};
