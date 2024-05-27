import { BrowserRouter } from "react-router-dom"
import AppRouter from "./components/AppRouter"
import Header from "./components/UI/Header/Header"

function App() {

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
