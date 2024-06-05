import { LANGUAGE } from "./constants";

const defaultState = {
  lang: localStorage.getItem('lang') || "ru"
}

export const changeLanguage = (state = defaultState, action) => {
  switch (action.type) {
    case LANGUAGE:
      return {...state, lang: action.lang}
    default:
      return state
  }
}

export const setLanguage = (lang) => ({type: LANGUAGE, lang:lang})