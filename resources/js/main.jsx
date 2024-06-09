import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import './assets/scss/variables.scss'
import { ContextProvider } from './context/ContextProvider.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.jsx'
import "./i18n.js"

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <Provider store={store}>
    <App />
    </Provider>
  </ContextProvider>
)
