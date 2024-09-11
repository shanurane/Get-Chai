import React from "react";
import PaymentPage from "@/components/PaymentPage";
import { notFound } from "next/navigation";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

const Username = async ({ params }) => {
  await connectDb();
  //If the username not present in the database, show a 404 page
  let u = await User.findOne({ username: params.username });
  if (!u) {
    return notFound();
  }
  return (
    <>
      <PaymentPage username={params.username} />
    </>
  );
};
export default Username;

export async function generateMetadata({ params }) {
  return {
    title: `${params.username} - Get Me A Chai`,
  };
}
