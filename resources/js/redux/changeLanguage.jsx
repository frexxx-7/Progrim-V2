import { LANGUAGE } from "./constants";

const defaultState = {
  lang: window.navigator.language.split('-')[0]
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