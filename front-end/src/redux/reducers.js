import {
  CHANGE_SEARCH_FIELD,
  CHANGE_FILTER_FIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED,
} from "./constants.js";

const initialStateSearch = {
  searchField: "",
  filterField: "",
};

export const searchCountries = (state = initialStateSearch, action = {}) => {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD:
      return Object.assign({}, state, { searchField: action.payload });
    case CHANGE_FILTER_FIELD:
      return Object.assign({}, state, { filterField: action.payload });
    default:
      return state;
  }
};

const initialStateCountries = {
  isPending: false,
  countries: [],
  error: "",
};

/* export const requestCountries = (
  state = initialStateCountries,
  action = {}
) => {
  switch (action.type) {
    case REQUEST_ROBOTS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_ROBOTS_SUCCESS:
      return Object.assign({}, state, {
        countries: action.payload,
        isPending: false,
      });
    case REQUEST_ROBOTS_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
      });
    default:
      return state;
  }
};
 */
