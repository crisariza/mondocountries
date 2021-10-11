import { CHANGE_SEARCH_FIELD, CHANGE_FILTER_FIELD } from "./constants.js";

export const setSearchField = (text) => ({
  type: CHANGE_SEARCH_FIELD,
  payload: text,
});

export const setFilterField = (text) => ({
  type: CHANGE_FILTER_FIELD,
  payload: text,
});
