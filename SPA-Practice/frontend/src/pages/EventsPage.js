import EventsList from "../components/EventsList";
import { useLoaderData } from "react-router-dom";
//gaining access to data loaded from loader prop"

function EventsPage() {
  const events = useLoaderData();
  return (
    <>
      <EventsList events={events} />{" "}
    </>
  );
}

export default EventsPage;
