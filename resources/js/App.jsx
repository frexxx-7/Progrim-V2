import { BrowserRouter } from "react-router-dom"
import AppRouter from "./components/AppRouter"
import Header from "./components/UI/Header/Header"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"

function App() {
  const lang_ = useSelector(state => state.lang.lang)
  const { i18n } = useTranslation()

  const changeLanguageHandler = (lang) => {
    i18n.changeLanguage(lang_)
  }

  useEffect(()=>{
    changeLanguageHandler()
  }, [lang_])
  
  return (
    <div className="app_background">
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </div>
  )
}

export default App
