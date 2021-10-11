let db = require("../../../db");

module.exports = async (req, res) => {
  try {
    const { type, page } = req.query;

    if (type === "alpdown") {
      const countries = await db.query(
        "SELECT * FROM countries WHERE country_id BETWEEN 250-($1*24)-($1-1) AND 250-(25*($1-1)) ORDER BY country_id DESC",
        [page]
      );
    } else if (type === "alpup") {
      const countries = await db.query(
        "SELECT * FROM countries WHERE country_id BETWEEN (25*$1)-24 AND 25*$1 ORDER BY country_id",
        [id]
      );
    } else if (
      type === "africa" ||
      type === "americas" ||
      type === "asia" ||
      type === "europe" ||
      type === "oceania"
    ) {
      const countries = await db.query(
        "SELECT * FROM countries WHERE LOWER(region) = LOWER($1) offset ((25*$2)-25) rows fetch next 25 rows only",
        [type, page]
      );
    } else if (
      type === "summer" ||
      type === "fall" ||
      type === "winter" ||
      type === "spring"
    ) {
      const countries = await db.query(
        "SELECT * FROM countries INNER JOIN activities ON cca3 = cca3  WHERE LOWER(cca3) = LOWER(cca3) AND LOWER(season) = LOWER($1) offset ((25*$2)-25) rows fetch next 25 rows only",
        [type, page]
      );
    }

    res.json(countries ? countries.rows : { message: "Countries not found." });
  } catch (err) {
    res.json({ error: err.message });
  }
};
