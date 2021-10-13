import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import MainCountries from "./components/home/maincountries/maincountries";
import MainCountry from "./components/individual/maincountry/maincountry";
import AddActivity from "./components/activities/add";

class App extends Component {
  render() {
    return (
      <div className="App">
        {" "}
        <BrowserRouter>
          <Route
            path="/"
            exact
            render={() => (window.location.href = "/countries/order/alpup/1")}
          />
          <Route path="/country/:id" render={() => <MainCountry />} />
          <Route
            path="/countries/order/:continent/:id"
            render={() => <MainCountries />}
          />
          <Route
            path="/countries/search/:id"
            render={() => <MainCountries />}
          />
          <Route exact path="/activities/add" render={() => <AddActivity />} />
        </BrowserRouter>{" "}
      </div>
    );
  }
}

export default App;
