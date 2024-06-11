import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import Home from './Home.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Home />
    </BrowserRouter>
  </React.StrictMode>,
)
