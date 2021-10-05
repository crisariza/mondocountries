import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import style from "./search.module.css";

class Search extends React.Component {
  render() {
    return (
      <div className={style.mainDiv}>
        <div className={style.search}>
          <form action={`/countries/search/${this.props.searchField}`}>
            <input
              type="text"
              onChange={this.props.searchChange}
              className={style.border}
              placeholder="Search countries"
            ></input>
          </form>{" "}
        </div>{" "}
        <div>
          <a
            href={`/countries${
              this.props.searchField
                ? "/search/" + this.props.searchField
                : "/1"
            }`}
            aria-label="Search button"
          >
            <div className={style.button}>
              <button
                className={style.border + " " + style.pointer}
                aria-label="Search icon"
              >
                <FontAwesomeIcon icon={faSearch} className={style.icon} />
              </button>
            </div>{" "}
          </a>
        </div>
      </div>
    );
  }
}

export default Search;
