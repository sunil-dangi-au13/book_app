import { useState, useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
// import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login'
import NoteContext from './context/notes/noteContext';


// const routesarr = [
//   {
//     path:'/',
//     component:<Home/>,
//     acess:localStorage.getItem('token')
//   },
//   {
//     path:'/home',
//     component:<Home/>,
//     acess:localStorage.getItem('token')
//   },
//   {
//     path:'/about',
//     component:<About/>,
//     acess:localStorage.getItem('token')
//   },
//   {
//     path:'/login',
//     component:<Login/>,
//     acess:!localStorage.getItem('token')
//   },
//   {
//     path:'/signup',
//     component:<Signup/>,
//     acess:localStorage.getItem('token')
//   }

// ]

function App() {
  const context = useContext(NoteContext)
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
        {/* {
        !localStorage.getItem('token') && (
          <Link to={'/login'} >
            Go to login
          </Link>
        )
      } */}
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
