import { Link } from "react-router-dom"

export default function HomePage() {

  // import useNavigate hook -> Programatic approachs
  // const navigate = useNavigate();

  // function navigateHandler(){
  //   navigate('/products')
  // }

  return(
  <>
    <h1>This is my home page!!</h1>
    <p>
        Go to <Link to="/products">The list of products</Link>
    </p>
    {/* <button onClick={navigateHandler}>Navigate</button> */}
  </>)
}
