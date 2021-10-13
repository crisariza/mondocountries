let db = require("../../db");

module.exports = async (req, res) => {
  try {
    const { text } = req.query;
    const countries = await db.query(
      "SELECT * FROM countries WHERE LOWER(name) LIKE LOWER(CONCAT('%', TEXT($1), '%')) ORDER by name",
      [text]
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
