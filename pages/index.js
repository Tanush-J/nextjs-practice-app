import { Fragment } from "react";
import { MongoClient } from "mongodb";
import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups!" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// //this function reruns on every call, this also good for api fetch as code runs on server not on client machine
// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUP
//         }
//     }
// }

//getStaticProps waits for fetched data to then correctly shows the data in pre-rendering, which is good for SEOs
//also this function is never executed on client machine so it safe to call APIs
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://tanushjangid1234:ftqwo0jR7bIffVUs@cluster0.6gmgaqm.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    //revalidate makes sure, if the page is getting requests then it reruns this function after every x seconds, so data is never old
    revalidate: 1,
  };
}

export default HomePage;
