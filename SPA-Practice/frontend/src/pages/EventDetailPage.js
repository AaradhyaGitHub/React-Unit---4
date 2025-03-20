import { useRouteLoaderData, redirect, Await } from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

export default function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading your event...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading events...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: "Could not fetch details for selected event"
      }),
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
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

export async function loader({ request, params }) {
  const id = params.eventId;

  return {
    event: await loadEvent(id),
    events: loadEvents()
  };
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: "Could not delete events..."
      }),
      { status: 500 }
    );
  } else {
    return redirect("/events");
  }
}
