import NewMeetupForm from "@/components/meetups/NewMeetupForm";

export default function NewMeetupPage() {
  function addMeetupHandler() {}
  return (
    <>
      <NewMeetupForm onAddMeetUp={addMeetupHandler} />
    </>
  );
}
