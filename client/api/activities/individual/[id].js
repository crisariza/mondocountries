let db = require("../../../db");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await db.query(
      "SELECT * FROM activities WHERE activity_id = $1",
      [id]
    );
    res.json(activity.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
};
