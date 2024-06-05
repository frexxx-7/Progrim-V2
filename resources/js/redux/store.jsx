import { composeWithDevTools } from "@redux-devtools/extension";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { searchQueryReducer } from "./searchQueryReducer";
import { changeLanguage } from "./changeLanguage";

const rootReducer = combineReducers({
  lang: changeLanguage,
  searchQuery: searchQueryReducer
})

export const store = configureStore({reducer: rootReducer}, composeWithDevTools())