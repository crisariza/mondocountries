import React from "react";
import style from "./country.module.css";

const Country = ({ country, activities }) => {
  return (
    <div className={style.data}>
      <div className={style.img}>
        <img src={country.flag} alt={country.name} />
      </div>
      <div>
        <ul>
          <li>
            <h2 className={style.title}>{country.name}</h2>
          </li>
          <li>
            <h3>ID: {country.alpha3code}</h3>
          </li>
          <li>
            <h3>Region: {country.region ? country.region : "-"}</h3>
          </li>
          <li>
            <h3>SubRegion: {country.subregion ? country.subregion : "-"}</h3>
          </li>
          <li>
            <h3>Capital: {country.capital ? country.capital : "-"}</h3>
          </li>
          <li>
            <h3>
              Area:{" "}
              {country.area
                ? country.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : country.area}
            </h3>
          </li>
          <li>
            <h3>
              Population:{" "}
              {country.population
                ? country.population
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : country.population}
            </h3>
          </li>
        </ul>
      </div>
      <div className={style.activities}>
        <ul>
          <li>
            <h2 className={style.title}>
              {activities.length > 1 ? "Activities" : "Activity"}
            </h2>
          </li>
          <li>
            {activities.length > 0
              ? activities.map((activity) => {
                  return (
                    <h3>
                      {activity.title}: It has a difficulty of{" "}
                      {activity.difficulty} stars, lasts for {activity.duration}{" "}
                      minutes and it's in the {activity.season}
                    </h3>
                  );
                })
              : "This country doesn't have any activity."}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Country;
