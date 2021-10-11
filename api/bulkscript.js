var pool = require("./db");
var axios = require("axios");

async function bulkScript() {
  try {
    await pool.query(
      "CREATE TABLE IF NOT EXISTS countries(country_id SERIAL PRIMARY KEY, cca3 VARCHAR(3), name VARCHAR(255), flag VARCHAR(255), capital VARCHAR(255), region VARCHAR(255), subregion VARCHAR(255), area DECIMAL, population INTEGER)"
    );
    console.log("Countries table up");

    await pool.query(
      "CREATE TABLE IF NOT EXISTS activities(activity_id SERIAL PRIMARY KEY, title VARCHAR(255), difficulty INTEGER, duration INTEGER, season VARCHAR(6), cca3 VARCHAR(3))"
    );
    console.log("Activities table up");

    const countries = await pool.query(
      "SELECT * FROM countries ORDER by country_id"
    );
    if (countries.rows.length === 0) {
      console.log("Adding countries");
      const restcountries = await axios.get(
        "https://restcountries.com/v3.1/all"
      );
      for (element of restcountries.data) {
        let {
          cca3,
          name,
          flags,
          capital,
          region,
          subregion,
          area,
          population,
        } = element;
        await pool.query(
          "INSERT INTO countries (cca3, name, flag, capital, region, subregion, area, population) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
          [
            cca3,
            name.common,
            flags.svg,
            capital ? capital[0] : "non-existent",
            region,
            subregion,
            area,
            population,
          ]
        );
      }
    }
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  bulkScript,
};
