import React from "react";
import style from "./maincountries.module.css";
import Nav from "../../nav/nav";
import Footer from "../../footer/footer";
import Filter from "../filter/filter";
import Search from "../search/search";
import Countries from "../countries/countries";
import Pagination from "../pagination/pagination";

const MainCountries = ({
  searchChange,
  searchField,
  filterField,
  filterChange,
}) => {
  return (
    <div>
      <Nav></Nav>
      <div className={style.bd_grid}>
        <div className={style.side}>
          <Search
            searchChange={searchChange}
            searchField={searchField}
          ></Search>
          <Filter
            filterChange={filterChange}
            filterField={filterField}
          ></Filter>
        </div>

        <Countries></Countries>
        <Pagination></Pagination>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainCountries;
