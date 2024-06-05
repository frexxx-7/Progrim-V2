import { composeWithDevTools } from "@redux-devtools/extension";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { searchQueryReducer } from "./searchQueryReducer";
import { changeLanguage } from "./changeLanguage";
import { changeColorsReducer } from "./changeColors";

const rootReducer = combineReducers({
  lang: changeLanguage,
  searchQuery: searchQueryReducer,
  changeColors: changeColorsReducer,
})

export const store = configureStore({ reducer: rootReducer }, composeWithDevTools())