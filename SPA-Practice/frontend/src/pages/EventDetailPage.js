import { useParams, Link } from "react-router-dom";

export default function EventDetailPage(){
    const params = useParams();

    return(
        <>
            <h1>This is the EventDetailPage</h1>
            <p>Selected Event: {params.eventId}</p>
            <p><Link to=".." relative="path">
          Back
        </Link></p>
        </>
    )
}



