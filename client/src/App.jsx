import { useState, useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login'
import BookContext from './context/books/BookContext';


function App() {
  const context = useContext(BookContext)
  const [alert, setAlert] = useState(null)
   const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  const { acessToken } = context
  console.log('token', acessToken);
  const routesarr = [
    {
      path: '/',
      component: <Home />,
      acess: acessToken
    },
    {
      path: '/home',
      component: <Home showAlert={showAlert}  />,
      acess: acessToken
    },
    {
      path: '/about',
      component: <About />,
      acess: acessToken
    },
    {
      path: '/login',
      component: <Login showAlert={showAlert}  />,
      acess: !acessToken
    },
    {
      path: '/signup',
      component: <Signup showAlert={showAlert} />,
      acess: !acessToken
    }

  ]

  
  return (
    <>
      <h1>ibook</h1>

      <BrowserRouter>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>

            {routesarr.map((route, index) => (
              route.acess ? <Route key={index} path={route.path} element={route.component} /> : <Route key={index} path={route.path} element={<Navigate replace to={'/login'}/>} />
            ))
            }

          </Routes>
        </div>
      </BrowserRouter>



    </>
  )

}

export default App
