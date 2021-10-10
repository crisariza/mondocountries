import React from "react";
import style from "./country.module.css";

const Country = ({ country }) => {
  return (
    <div className={style.margins}>
      <a
        href={
          "/country/" +
          (country.cca3 ? country.cca3.toLowerCase() : country.cca3)
        }
      >
        <div className={style.card}>
          <img
            src={country.flag}
            className={style.card_img}
            alt={country.name}
          />
          <ul className={style.card_items}>
            <li>
              <h3>{country.name}</h3>
            </li>
            <li>
              <h4>Region: {country.region ? country.region : "-"}</h4>
            </li>
            <li>
              <h4>Capital: {country.capital ? country.capital : "-"}</h4>
            </li>
            <li>
              <h4>
                Population:{" "}
                {country.population
                  ? country.population
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : country.population}
              </h4>
            </li>
          </ul>
        </div>
      </a>
    </div>
  );
};

export default Country;
