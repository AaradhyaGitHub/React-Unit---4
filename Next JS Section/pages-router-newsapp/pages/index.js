import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "First Meetup",
    image:
      "https://theinsatiabletraveler.com/wp-content/uploads/2016/02/Cuba-Photography-Havana-584902.jpg",
    address: "123 Romero Yoel St, Havana, Cuba",
    description: "This is the first meetup"
  },
  {
    id: "m2",
    title: "Second Meetup",
    image:
      "https://plus.unsplash.com/premium_photo-1716932567535-6bb42a3f38ff?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmllbm5lfGVufDB8fDB8fHww",
    address: "456 Billy Joel St, Vienne, France",
    description: "This is the second meetup"
  }
];
export default function HomePage() {
  return (
    <>
\        <MeetupList meetups={DUMMY_MEETUPS} />
    </>
  );
}
3