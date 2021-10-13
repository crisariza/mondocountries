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
    const url = `${API_URL}/countries/${location[4]}/${location[5]}/${location[6]}`;

    const response = await fetch(url);
    let data = await response.json();
    console.log(data);
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
        ) : this.state.countries.length > 0 ? (
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
