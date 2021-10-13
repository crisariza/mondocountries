let db = require("../../../db");

module.exports = async (req, res) => {
  try {
    const { text, page } = req.query;
    const countries = await db.query(
      "SELECT * FROM countries WHERE LOWER(name) LIKE LOWER(CONCAT('%', TEXT($1), '%')) ORDER by name offset ((25*$2)-25) rows fetch next 25 rows only",
      [text, page]
    );
    const countriesLength = await db.query(
      "SELECT CEILING (COUNT(country_id)/CAST(25 AS float)) FROM countries WHERE LOWER(name) LIKE LOWER(CONCAT('%', TEXT($1), '%'))",
      [text]
    );

    res.json(
      countries
        ? {
            countries: countries.rows,
            paginate_quantinty: countriesLength.rows[0].ceiling,
          }
        : { message: "Countries not found." }
    );
  } catch (err) {
    res.json({ error: err.message });
  }
};
