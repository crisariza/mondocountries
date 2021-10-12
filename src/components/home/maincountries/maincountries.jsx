import React from "react";
import style from "./maincountries.module.css";
import Nav from "../../nav/nav";
import Footer from "../../footer/footer";
import Filter from "../filter/filter";
import Search from "../search/search";
import Countries from "../countries/countries";
import Pagination from "../pagination/pagination";

const MainCountries = () => {
  return (
    <div>
      <Nav></Nav>
      <div className={style.bd_grid}>
        <div className={style.side}>
          <Search></Search>
          <Filter></Filter>
        </div>
        <Countries></Countries>
        <Pagination></Pagination>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainCountries;
