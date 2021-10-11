let db = require("../../db");

module.exports = async (req, res) => {
  try {
    const { id } = req.query;
    const country = await db.query(
      "SELECT * FROM countries WHERE LOWER(cca3) = LOWER($1)",
      [2]
    );
    //const activity = await db.query(
    //"SELECT * FROM activities WHERE LOWER(cca3) LIKE LOWER(CONCAT('%', $1::letchar , '%')) ORDER by activity_id",
    //[2]
    //);
    res.json({ country: country.rows[0] });
  } catch (err) {
    res.json({ error: err.message });
  }
};
