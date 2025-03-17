import EventsList from "../components/EventsList";
import { useLoaderData } from "react-router-dom";
//gaining access to data loaded from loader prop"

function EventsPage() {
  const data = useLoaderData();

  if (data.isError) {
    return <p>{data.message}</p>;
  }

  const events = data.events;

  return (
    <>
      <EventsList events={events} />{" "}
    </>
  );
}

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {

    // Approach#1 -> return { isError: true, message: "Could not fetch events. " };
    // Approach#2 -> return json({message: 'Could not fetch events.'}, {status: 500})
            //    -> less code | No need to parse in ErrorPage.jsx 
    throw new Response(
      JSON.stringify({
        message: "Could not fetch events"
      }),
      { status: 500 }
    );
  } else {
    return response;
    //   const resData = await response.json();
    //  const res = new Response()
    // this returned data is automatically available in Events page
    // it's available in other components too
  }
}
