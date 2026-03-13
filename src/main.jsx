import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from "react-dom/client"

createRoot(document.getElementById('root')).render(
  <div className="min-h-screen bd-slate-900 text-white">
    <StrictMode>
      <App />
    </StrictMode>
  </div>
)
