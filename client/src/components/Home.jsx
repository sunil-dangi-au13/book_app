import Books from "./Books"

 const Home = (props) => {
  const{showAlert}= props
  
  return (
    <div>
      
<Books showAlert={showAlert}/> 
 
    </div>
  )
}

export default Home