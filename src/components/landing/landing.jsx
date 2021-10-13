import React from "react";
import style from "./landing.module.css";

const Landing = () => {
  return (
    <div className={style.overflow}>
      <div className={style.bd_grid}>
        <div className={style.title}>
          <a href="/countries/order/alpup/1">
            <h1>Mondo</h1>
          </a>
        </div>
        <div className={style.findout}>
          <h1>
            Find out and create the best activities in each country. For Free.
          </h1>
        </div>
        <div>
          <a href="/countries/order/alpup/1">
            <button className={style.button}>Discover everything</button>
          </a>
        </div>
      </div>
      <div>
        <img src="/earth.png" className={style.earth} />
      </div>
    </div>
  );
};

export default Landing;
