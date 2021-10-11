let db = require("../../../db");

module.exports = async (req, res) => {
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
};
