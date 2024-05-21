import { useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import NoteContext from '../context/notes/noteContext';

 



const Login = (props) => {
  const context = useContext(NoteContext)
  const{setAcessToken} = context
    const navigate = useNavigate()
    
    const[cardential,setCardential]= useState({email:"",password:""})
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/api/auth/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        
            body:JSON.stringify({email:cardential.email, password:cardential.password})
        })
        const json = await response.json();
        console.log(json);
        if(json.success){
            //Save token and redirect
            //setAcessToken?.setItem("token",json.authtoken)
            setAcessToken(json.authtoken)
            navigate("/home")
           props.showAlert(" User Login Successfully","success");

        }else{
            alert("please enter valid cardential")
        }

    }
    const onChange = (e)=>{
        setCardential({...cardential,[e.target.name]:e.target.value})
    
       }
  return (
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' value={cardential.email} onChange={onChange} aria-describedby="emailHelp"/>
     
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' value={cardential.password} onChange={onChange}/>
  </div>
   
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
  )
}
 

export default Login
 