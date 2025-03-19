import EventsList from "../components/EventsList";
import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
//gaining access to data loaded from loader prop"

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
      
    </Suspense>
  );
}

export default EventsPage;

async function laodEvents() {
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
    const resData = await response.json();
    return resData.events;
    // return response;
    //   const resData = await response.json();
    //  const res = new Response()
    // this returned data is automatically available in Events page
    // it's available in other components too
  }
}

export function loader() {
  return {
    events: laodEvents()
  };
}
