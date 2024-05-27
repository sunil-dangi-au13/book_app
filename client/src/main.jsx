import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import BookState from './context/books/BookState.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BookState>
    <App />
    </BookState>
  </React.StrictMode>,
)
