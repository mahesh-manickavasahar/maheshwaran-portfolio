import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// 🔑 Firebase imports
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
