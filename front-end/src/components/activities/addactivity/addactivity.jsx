import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faSnowflake } from "@fortawesome/free-solid-svg-icons";
import {
  faCanadianMapleLeaf,
  faEnvira,
} from "@fortawesome/free-brands-svg-icons";
import style from "./addactivity.module.css";
import Nav from "../../nav/nav";
import Footer from "../../footer/footer";
const { REACT_APP_API_URL } = process.env;
class AddActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
      countriesNames: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addCountry = this.addCountry.bind(this);
    this.handleCountriesChange = this.handleCountriesChange.bind(this);
  }
  async componentDidMount() {
    const response = await fetch(`${REACT_APP_API_URL}/countries`);
    const data = await response.json();
    this.setState({ countriesNames: data });
  }
  handleChange(e) {
    if (e.target.name === "title") {
      this.setState({ title: e.target.value });
    } else if (e.target.name === "difficulty") {
      this.setState({ difficulty: e.target.value });
    } else if (e.target.name === "duration") {
      this.setState({ duration: e.target.value });
    } else if (e.target.name === "season") {
      this.setState({ season: e.target.value });
    }
  }

  handleSubmit(e) {
    if (
      !this.state.title ||
      !this.state.difficulty ||
      !this.state.duration ||
      !this.state.season ||
      this.state.countries.length === 0
    ) {
      alert("The form fields are incomplete!");
      e.preventDefault();
    } else {
      fetch(`${REACT_APP_API_URL}/addactivity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: this.state.title,
          difficulty: this.state.difficulty,
          duration: this.state.duration,
          season: this.state.season,
          countries: this.state.countries.join(", "),
        }),
      }).then((response) => response.json());
      alert("An form was submitted!");
      window.location.reload();
    }
  }
  addCountry() {
    this.setState({ countries: [...this.state.countries, ""] });
  }

  handleCountriesChange(e, index) {
    console.log(e.target.value);
    this.state.countries[index] = e.target.value;
    this.setState({ countries: this.state.countries });
  }
  render() {
    console.log(this.state.countries.length);
    return (
      <div>
        <Nav></Nav>
        <div
          className={this.state.countries.length >= 3 ? style.max : style.min}
        >
          <div className={style.bd_grid + " " + style.form}>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <div className={style.margin}>
                <h2 className={style.h2title}>Title</h2>
                <input
                  maxLength={100}
                  placeholder="Write a title"
                  name="title"
                  className={style.input + " " + style.title}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div>
                <h2 className={style.difficultyh2}>Difficulty</h2>{" "}
                <div className={style.difficulty}>
                  {" "}
                  <input
                    type="radio"
                    id="star5"
                    name="difficulty"
                    value="5"
                    onChange={this.handleChange}
                  />
                  <label for="star5" title="5 stars"></label>
                  <input
                    type="radio"
                    id="star4"
                    name="difficulty"
                    value="4"
                    onChange={this.handleChange}
                  />
                  <label for="star4" title="4 stars"></label>
                  <input
                    type="radio"
                    id="star3"
                    name="difficulty"
                    value="3"
                    onChange={this.handleChange}
                  />
                  <label for="star3" title="3 stars"></label>
                  <input
                    type="radio"
                    id="star2"
                    name="difficulty"
                    value="2"
                    onChange={this.handleChange}
                  />
                  <label for="star2" title="2 stars"></label>
                  <input
                    type="radio"
                    id="star1"
                    name="difficulty"
                    value="1"
                    onChange={this.handleChange}
                  />
                  <label for="star1" title="1 star"></label>
                </div>{" "}
              </div>
              <div>
                <h2 className={style.durationh2}>Duration</h2>
                <div>
                  <label for="duration">
                    {" "}
                    {this.state.duration
                      ? this.state.duration + " minutes"
                      : "Select a duration"}
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="120"
                    step="15"
                    name="duration"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div>
                <h2>Season</h2>
                <label>
                  <input
                    type="radio"
                    name="season"
                    value="Summer"
                    onChange={this.handleChange}
                  />{" "}
                  <FontAwesomeIcon icon={faSun} /> Summer{" "}
                </label>{" "}
                <label>
                  <input
                    type="radio"
                    name="season"
                    value="Fall"
                    onChange={this.handleChange}
                  />{" "}
                  <FontAwesomeIcon icon={faCanadianMapleLeaf} /> Fall{" "}
                </label>{" "}
                <label>
                  <input
                    type="radio"
                    name="season"
                    value="Winter"
                    onChange={this.handleChange}
                  />{" "}
                  <FontAwesomeIcon icon={faSnowflake} /> Winter{" "}
                </label>{" "}
                <label>
                  <input
                    type="radio"
                    name="season"
                    value="Spring"
                    onChange={this.handleChange}
                  />{" "}
                  <FontAwesomeIcon icon={faEnvira} /> Spring{" "}
                </label>
              </div>
              <div>
                <h2>
                  {this.state.countries.length > 1 ? "Countries" : "Country"}
                </h2>{" "}
                <div>
                  {this.state.countries
                    ? this.state.countries.map((country, index) => {
                        return (
                          <div key={index}>
                            <select
                              onChange={(e) =>
                                this.handleCountriesChange(e, index)
                              }
                              value={country}
                              className={
                                style.input +
                                " " +
                                style.select +
                                " " +
                                style.margin
                              }
                              required
                            >
                              {" "}
                              <option value="">Select a country</option>
                              {this.state.countriesNames.map((country) => {
                                return (
                                  <option value={country.country_id}>
                                    {country.name}
                                  </option>
                                );
                              })}{" "}
                            </select>
                          </div>
                        );
                      })
                    : ""}
                  <button
                    className={style.button + " " + style.addCountry}
                    onClick={(e) => this.addCountry(e)}
                    type="button"
                  >
                    Add a country
                  </button>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className={style.button + " " + style.submit}
                >
                  Submit the activity
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default AddActivity;
