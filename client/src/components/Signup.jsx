
import React,{useState,useContext} from 'react';
import{useNavigate} from 'react-router-dom';
import NoteContext from '../context/notes/noteContext';


const Signup = (props) => {
  const context = useContext(NoteContext)
  const{setAcessToken}= context
    const navigate = useNavigate()
    
    const[cardential,setCardential]= useState({name:"",email:"",password:"",cpassword:""})
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const{name,email,password}= cardential
        const response = await fetch(`http://localhost:3000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        
            body:JSON.stringify({name,email,password})
        })
        const json = await response.json();
        console.log(json);
        if(json.success){
            //Save token and redirect
            //localStorage.setItem("token",json.authtoken)
             setAcessToken(json.authtoken)
            navigate("/login")
            props.showAlert(" Account Created Successfully","success")

        }else{
            //alert("please enter valid cardential")
            props.showAlert("Invalid Cardential","Danger")
        }

    }
    const onChange = (e)=>{
        setCardential({...cardential,[e.target.name]:e.target.value})
    
       }
  return (
    <form onSubmit={handleSubmit}>
         <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name='name'value={cardential.name} onChange={onChange} aria-describedby="name"/>
     
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' value={cardential.email} onChange={onChange} aria-describedby="emailHelp"/>
     
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password'value={cardential.password} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name='cpassword' value={cardential.cpassword} onChange={onChange}/>
  </div>
   
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
  )
}

export default Signup