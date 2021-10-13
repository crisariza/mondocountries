import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import style from "./pagination.module.css";

//const { API_URL } = process.env;
const API_URL = "https://mondocountries.vercel.app/api";
const location = window.location.href.split("/");

class Pagination extends React.Component {
  state = {
    locationQuery: "",
    locationLength: 1,
    pageNumber: 1,
  };
  async componentDidMount() {
    const url = `${API_URL}/countries/${location[4]}/${location[5]}/${location[6]}`;

    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      locationLength: data.paginate_quantity,
      locationQuery: `${location[4]}/${location[5]}`,
    });
    console.log(this.state.locationQuery);
  }
  render() {
    let pagination = [];
    for (let i = 1; i <= this.state.locationLength; i++) {
      pagination.push(
        <a
          key={i}
          href={`/countries/order/${this.state.locationQuery}/${i}`}
          className={
            this.state.pageNumber === i
              ? style.active + " " + style.each
              : style.each
          }
        >
          {i}
        </a>
      );
    }
    return (
      <div className={style.center}>
        <a
          href={`/countries/order/${this.state.locationQuery}/${
            this.state.pageNumber - 1
          }`}
          className={this.state.pageNumber === 1 ? style.disabled : style.each}
          aria-label="Paginate left"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </a>
        {pagination}
        {pagination.length > 0 ? (
          <a
            href={`/countries/order/${this.state.locationQuery}/${
              this.state.pageNumber + 1
            }`}
            className={
              this.state.pageNumber === this.state.locationLength
                ? style.disabled
                : style.each
            }
            aria-label="Paginate right"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </a>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Pagination;
