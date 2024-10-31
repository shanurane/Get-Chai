import React from "react";
import PaymentPage from "@/components/PaymentPage";
import { notFound } from "next/navigation";
import connectDb from "@/db/connectDb";
import User from "@/models/User";
import Posts from "@/components/Posts";
import Menu from "@/components/Menu";

const Username = async ({ params }) => {
  const { username } = await params;

  await connectDb();
  //If the username not present in the database, show a 404 page
  let u = await User.findOne({ username: username });
  if (!u) {
    return notFound();
  }

  return (
    <>
      <div className="overflow-hidden w-full">
        <div className="w-full">
          <PaymentPage username={username} />
          <Posts List username={username} />
        </div>
      </div>
    </>
  );
};
export default Username;

export async function generateMetadata({ params }) {
  const { username } = await params;

  return {
    title: `${username} - Get Connect`,
  };
}
