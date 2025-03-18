import EventForm from "../components/EventForm";

export default function NewEventPage() {
  return (
    <>
      <EventForm />
    </>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"), // Fixed missing key
  };

  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(eventData)
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not set event" }),
      { status: 500 }
    );
  }

  return response; // ✅ Ensure React Router knows the request outcome
}
