import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient } from "mongodb";

function MeetupDetails() {
  return (
    <>
      <MeetupDetail
        image="https://theinsatiabletraveler.com/wp-content/uploads/2016/02/Cuba-Photography-Havana-584902.jpg"
        title="First Meetup"
        address="123 Romero Yoel St, Havana, Cuba"
        description="Striking and coding. Nerds of UFC and software dev are invited! Coffee and cigars will be provided"
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://aaradhyagithub:3ppmxYK9s4MvoIH3@cluster0.8mzk3yy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsColelction.find({}, { _id: 1 });

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() }
    }))
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params;

  return {
    props: {
      meetupDate: {
        image:
          "https://theinsatiabletraveler.com/wp-content/uploads/2016/02/Cuba-Photography-Havana-584902.jpg",
        id: meetupId,
        title: "First Meetup",
        address: "123 Romero Yoel St, Havana, Cuba"
      }
    }
  };
}

export default MeetupDetails;
