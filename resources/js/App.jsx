import { BrowserRouter } from "react-router-dom"
import AppRouter from "./components/AppRouter"
import Header from "./components/UI/Header/Header"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"

function App() {
  const lang_ = useSelector(state => state.lang.lang)
  const mainColor_ = useSelector(state => state.changeColors.mainColor)
  const fontColor_ = useSelector(state => state.changeColors.fontColor)
  const additionalColor_ = useSelector(state => state.changeColors.additionalColor)

  const { i18n } = useTranslation()

  const changeLanguageHandler = (lang) => {
    i18n.changeLanguage(lang_)
  }

  useEffect(() => {
    document.body.style.setProperty('--main_color', mainColor_)
    document.body.style.setProperty('--font_color', fontColor_)
    document.body.style.setProperty('--additional_color', additionalColor_)
  }, [mainColor_, fontColor_, additionalColor_])

  useEffect(() => {
    changeLanguageHandler()
  }, [lang_])

  return (
    <div className="v2">
      <div className="app_background">
      </div>
      <div className="app_container">
        <div className="app_content">
          <BrowserRouter>
            <Header />
            <AppRouter />
          </BrowserRouter>
        </div>
      </div>
    </div>
  )
}

export default App
