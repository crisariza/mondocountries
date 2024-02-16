import React from "react";
import style from "./countries.module.css";
import Country from "../country/country";

const { REACT_APP_API_URL } = process.env;
const location = window.location.href.split("/");
class Countries extends React.Component {
  state = {
    loading: "loading",
    countries: "",
    countriesAmount: 25,
    queryType: location[4],
    queryInput: location[5],
    pageNumber: parseInt(location[6]),
  };

  async componentDidMount() {
    const url = `${REACT_APP_API_URL}/countries/${this.state.queryType}/${this.state.queryInput}/${this.state.pageNumber}`;

    const response = await fetch(url);
    console.log(REACT_APP_API_URL);
    let data = await response.json();
    this.setState({ countries: data.countries });
    this.setState({ loading: "" });
  }
  renderProduct = (country) => {
    return <Country country={country} key={country.cca3} />;
  };

  render() {
    return (
      <div
        className={
          style.cards + " " + (this.state.loading ? style.loading : "")
        }
      >
        {this.state.loading ? (
          <h1>{this.state.loading}</h1>
        ) : this.state.countries ? (
          this.state.countries.map((country) => {
            return this.renderProduct(country);
          })
        ) : (
          <div className={style.loading}>
            {" "}
            <h1>We couldn't find any matching country.</h1>
          </div>
        )}
      </div>
    );
  }
}

export default Countries;
