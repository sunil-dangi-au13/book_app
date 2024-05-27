import {useEffect,useContext} from 'react';
import {Link,useNavigate,useLocation} from'react-router-dom'
import BookContext from '../context/books/BookContext';


const Navbar = () => {
  const context = useContext(BookContext)
  const{acessToken,setAcessToken} = context
  const navigate = useNavigate();
  const handleLogout= ( )=>{
    
    setAcessToken(null)
    navigate("/login")
  }
  let location = useLocation();
  useEffect(()=>{
  },[location])
  return (
    <nav className="navbar navbar-expand-lg   bg-body-tertiary">
    <div className="container-fluid ">
      <Link className="navbar-brand mb-1" to="/">ibook</Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            {acessToken?
            <Link className={`nav-link ${location.pathname=== "/"? "active":""}`} aria-current="page" to="/home">Home</Link>
            :null}
          </li>
          <li className="nav-item">
          {acessToken?
            <Link className={`nav-link ${location.pathname=== "/about"? "active":""}`} to="/about">About</Link>
            :null}
          </li>
           
        </ul>
        {!acessToken ? <form className="d-flex">
        <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
        <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
        </form>:<button onClick={handleLogout} className='btn btn-primary'>Logout</button>}
      </div>
    </div>
  </nav>
  )
}

export default Navbar;