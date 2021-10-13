import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import style from "./pagination.module.css";

const { API_URL } = process.env;
const location = window.location.href.split("/");

class Pagination extends React.Component {
  state = {
    locationLength: 1,
    queryType: location[4],
    queryInput: location[5],
    pageNumber: parseInt(location[6]),
  };
  async componentDidMount() {
    const url = `${API_URL}/countries/${this.state.queryType}/${this.state.queryInput}/${this.state.pageNumber}`;

    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      locationLength: data.paginate_quantity,
    });
  }
  render() {
    let pagination = [];
    for (let i = 1; i <= this.state.locationLength; i++) {
      pagination.push(
        <a
          key={i}
          href={`/countries/${this.state.queryType}/${this.state.queryInput}/${i}`}
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
          href={`/countries/${this.state.queryType}/${this.state.queryInput}/${
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
            href={`/countries/${this.state.queryType}/${
              this.state.queryInput
            }/${this.state.pageNumber + 1}`}
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
