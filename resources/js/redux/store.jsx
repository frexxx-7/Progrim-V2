import { composeWithDevTools } from "@redux-devtools/extension";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { searchQueryReducer } from "./searchQueryReducer";

const rootReducer = combineReducers({
  searchQuery: searchQueryReducer
})

export const store = configureStore({reducer: rootReducer}, composeWithDevTools())