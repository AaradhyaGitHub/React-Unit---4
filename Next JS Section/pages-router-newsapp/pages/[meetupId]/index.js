import MeetupDetail from "@/components/meetups/MeetupDetail";
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
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1"
        }
      },
      {
        params: {
          meetupId: "m2"
        }
      }
    ]
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
