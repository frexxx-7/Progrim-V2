import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { ContextProvider } from './context/ContextProvider.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <Provider store={store}>
    <App />
    </Provider>
  </ContextProvider>
)
