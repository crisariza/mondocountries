let db = require("../../../db");

module.exports = async (req, res) => {
  try {
    const activities = await db.query(
      "SELECT * FROM activities ORDER by activity_id"
    );
    res.json(activities.rows);
  } catch (err) {
    console.log(err.message);
  }
};
