import { MAIN_COLOR } from "./constants";
import { FONT_COLOR } from "./constants";
import { ADDITIONAL_COLOR } from "./constants";

const defaultState = {
  mainColor: localStorage.getItem('main_color') || "#000",
  fontColor: localStorage.getItem('font_color') || "#fff",
  additionalColor: localStorage.getItem('additional_color') || "#4d4d4d",
}

export const changeColorsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MAIN_COLOR:
      return { ...state, mainColor: action.mainColor }
    case FONT_COLOR:
      return { ...state, fontColor: action.fontColor }
    case ADDITIONAL_COLOR:
      return { ...state, lang: action.additionalColor }
    default:
      return state
  }
}

export const setMainColor = (mainColor) => ({ type: MAIN_COLOR, mainColor: mainColor })
export const setFontColor = (fontColor) => ({ type: FONT_COLOR, fontColor: fontColor })
export const setAdditionalColor = (additionalColor) => ({ type: ADDITIONAL_COLOR, additionalColor: additionalColor })