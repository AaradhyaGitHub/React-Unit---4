import NewMeetupForm from "@/components/meetups/NewMeetupForm";

function NewMeetupPage() {
  function addMeetupHandler() {}
  return (
    <>
      <NewMeetupForm onAddMeetUp={addMeetupHandler} />
    </>
  );
}

\