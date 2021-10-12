let db = require("../../db");

module.exports = async (req, res) => {
  try {
    const { text } = req.query;
    const countries = await db.query(
      "SELECT * FROM countries WHERE LOWER(name) LIKE LOWER(CONCAT('%', TEXT($1), '%')) ORDER by country_id",
      [text]
    );
    console.log(countries);
    res.json(
      countries
        ? {
            countries: country.rows[0],
            paginate_quatinty: parseFloat(countries.rows[0].length / 25),
          }
        : { message: "Country not found." }
    );
  } catch (err) {
    res.json({ error: err.message });
  }
};
