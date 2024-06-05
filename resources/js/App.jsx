import { BrowserRouter } from "react-router-dom"
import AppRouter from "./components/AppRouter"
import Header from "./components/UI/Header/Header"
import { useSelector } from "react-redux"

function App() {
  const lang_ = useSelector(state => state.lang.lang)

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
