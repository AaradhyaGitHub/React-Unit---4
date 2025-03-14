import { Link } from "react-router-dom"
export default function HomePage(){
    return(
        <>
            <h1>This is the HomePage</h1>
            <p><Link to=".." relative="path">
          Back
        </Link></p>
        </>
    )
}