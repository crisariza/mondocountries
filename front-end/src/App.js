import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import MainCountries from "./components/home/maincountries/maincountries";
import MainCountry from "./components/individual/maincountry/maincountry";
import AddActivity from "./components/activities/addactivity/addactivity";
import Landing from "./components/landing/landing";

import { setSearchField, setFilterField } from "./redux/actions";
import { connect, Provider } from "react-redux";

const mapStateToProps = (state) => {
  return {
    searchField: state.searchCountries.searchField,
    filterField: state.searchCountries.filterField,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onFilterChange: (event) => dispatch(setFilterField(event.target.value)),
  };
};

class App extends Component {
  render() {
    const {
      searchField,
      onSearchChange,
      filterField,
      onFilterChange,
    } = this.props;

    return (
      <div className="App">
        {" "}
        <BrowserRouter>
          <Route
            path="/"
            exact
            render={() => (window.location.href = "/countries/1")}
          />
          <Route path="/country/:id" render={() => <MainCountry />} />
          <Route
            path="/countries/:id"
            render={() => (
              <MainCountries
                searchChange={onSearchChange}
                searchField={searchField}
                filterChange={onFilterChange}
                filterField={filterField}
              />
            )}
          />
          <Route exact path="/addactivity" render={() => <AddActivity />} />
        </BrowserRouter>{" "}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
