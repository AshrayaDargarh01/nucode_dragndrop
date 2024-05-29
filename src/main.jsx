import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { SolidityDataProvider } from './context/SolidityDataContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SolidityDataProvider>git push -u origin main
    <App />

    </SolidityDataProvider>
  </React.StrictMode>,
)
