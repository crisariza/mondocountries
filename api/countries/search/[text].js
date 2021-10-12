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
            countries: countries.rows,
            paginate_quantinty: Math.ceil(countries.rows.length / 25),
          }
        : { message: "Countries not found." }
    );
  } catch (err) {
    res.json({ error: err.message });
  }
};
