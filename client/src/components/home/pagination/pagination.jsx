import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import style from "./pagination.module.css";
const { REACT_APP_API_URL } = process.env;
class Pagination extends React.Component {
  state = {
    locationOrder: "",
    locationLength: 1,
    pageNumber: 1,
  };
  async componentDidMount() {
    const location = window.location.href.split("/");
    let url;
    if (Number.isInteger(parseInt(location[6]))) {
      url = `${REACT_APP_API_URL}/countries/paginate/${location[5]}`;
      this.setState({ locationOrder: location[5] });
      this.setState({ pageNumber: parseInt(location[6]) });
    }
    if (Number.isInteger(parseInt(location[4]))) {
      url = `${REACT_APP_API_URL}/countries/paginate/${location[3]}`;
      this.setState({ locationOrder: location[3] });
      this.setState({ pageNumber: parseInt(location[4]) });
    }
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ locationLength: data.paginate_quantity });
  }
  render() {
    let pagination = [];
    for (let i = 1; i <= this.state.locationLength; i++) {
      pagination.push(
        <a
          key={i}
          href={
            this.state.locationOrder != "countries"
              ? `/countries/order/${this.state.locationOrder}/${i}`
              : `/countries/${i}`
          }
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
          href={
            this.state.locationOrder != "countries"
              ? `/countries/order/${this.state.locationOrder}/${
                  this.state.pageNumber - 1
                }`
              : `/countries/${this.state.pageNumber - 1}`
          }
          className={this.state.pageNumber === 1 ? style.disabled : style.each}
          aria-label="Paginate left"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </a>
        {pagination}
        {pagination.length > 0 ? (
          <a
            href={
              this.state.locationOrder != "countries"
                ? `/countries/order/${this.state.locationOrder}/${
                    this.state.pageNumber + 1
                  }`
                : `/countries/${this.state.pageNumber + 1}`
            }
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
