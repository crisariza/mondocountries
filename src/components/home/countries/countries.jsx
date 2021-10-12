import React from "react";
import style from "./countries.module.css";
import Country from "../country/country";

const API_URL = "https://mondocountries.vercel.app/api";
const location = window.location.href.split("/");
class Countries extends React.Component {
  state = {
    loading: "loading",
    countries: "",
    countriesAmount: 25,
  };

  async componentDidMount() {
    let url = `${API_URL}/countries/order/alpup/${location[4]}`;

    if (location[4] === "search") {
      url = `${API_URL}/countries/search/${location[5].replace("?", "")}`;
      console.log(url);
    } else if (location[5] === "popup" || location[5] === "popdown") {
      url = `${API_URL}/countries/order/${location[5]}/${location[6]}`;
    } else if (location[5]) {
      url = `${API_URL}/countries/order/${location[5]}/${location[6]}`;
    }
    const response = await fetch(url);
    let data = await response.json();
    console.log("asd");
    this.setState({ countries: data.countries });
    this.setState({ loading: "" });
  }
  renderProduct = (country) => {
    if (location[5] === "popup" || location[5] === "popdown") {
      <Country country={country} key={country.cca3} />;
    }
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
        ) : this.state.countries.length > 0 ? (
          location[5] === "popup" || location[5] === "popdown" ? (
            this.state.countries
              .slice(location[6] * 25 - 25, location[6] * 25)
              .map((country) => {
                return this.renderProduct(country);
              })
          ) : (
            this.state.countries.map((country) => {
              return this.renderProduct(country);
            })
          )
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
