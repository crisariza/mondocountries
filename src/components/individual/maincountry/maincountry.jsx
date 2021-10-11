import React from "react";
import style from "./maincountry.module.css";
import Nav from "../../nav/nav";
import Footer from "../../footer/footer";
import Country from "../country/country";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const { API_URL } = process.env;
class Countries extends React.Component {
  state = {
    loading: "Loading...",
    country: "",
    activities: "",
  };
  async componentDidMount() {
    const location = window.location.href.split("/")[4];
    const url = `${API_URL}/country/${location}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ country: data.country });
    this.setState({ activities: data.activities });
    this.setState({ loading: "" });
  }
  renderProduct = (country, activities) => {
    return (
      <div className={style.big}>
        {" "}
        <Country country={country} activities={activities} />
      </div>
    );
  };
  renderLoading = () => {
    return (
      <div className={style.loading}>
        <h1>{this.state.loading}</h1>
      </div>
    );
  };
  render() {
    return (
      <div>
        <Nav></Nav>
        <div className={style.bd_grid}>
          {" "}
          <a href={document.referrer}>
            <button className={style.back}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                className={style.faArrowLeft}
              ></FontAwesomeIcon>
              Back
            </button>{" "}
          </a>
          <div className={style.cards}>
            {this.state.loading
              ? this.renderLoading(this.state.loading)
              : this.renderProduct(this.state.country, this.state.activities)}
          </div>{" "}
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Countries;
