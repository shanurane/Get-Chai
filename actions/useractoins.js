"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import User from "@/models/User";
import Post from "@/models/Post";
import connectDb from "@/db/connectDb";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDb();
  let user = await User.findOne({ username: to_username });
  if (!user || !user.razorpayid) {
    console.log("RazorPay Id Not Found!!");
    return;
  }
  const secret = user.razorpaysecret;
  var instance = new Razorpay({
    key_id: user.razorpayid,
    key_secret: secret,
  });

  let x = await instance.orders.create({
    amount: Number.parseInt(amount),
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2",
    },
  });

  await Payment.create({
    name: paymentform.name,
    to_user: to_username,
    oid: x.id,
    amount: amount / 100,
    message: paymentform.message,
  });

  return x;
};

export const fetchuser = async (username) => {
  await connectDb();
  let u = await User.findOne({ username: username });

  let user = u.toObject({ flattenObjectIds: true });
  return user;
};

export const createpost = async (data, username) => {
  await connectDb();
  let post = await fetchuser(username);
  if (post) {
    await Post.create({
      name: data.name,
      username: username,
      message: data.message,
      postpic: data.postpic,
    });
  } else {
    return { erroe: "Post Not Found!!" };
  }
};

export const fetchposts = async (username) => {
  await connectDb();

  // Fetch the posts and wait for the result
  let posts = await Post.find({ username: username }).exec();

  // Convert each post document to a plain object
  let userPosts = posts.map((post) =>
    post.toObject({ flattenObjectIds: true })
  );

  return userPosts;
};

export const fetchpayments = async (username) => {
  await connectDb();
  let p = await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .limit(4);
  let paym = p.map((doc) => doc.toObject({ flattenObjectIds: true }));
  return paym;
};

export const updateProfile = async (data, oldusername) => {
  await connectDb();
  let ndata = Object.fromEntries(data);

  //If the username being updated, check the username being available
  if (oldusername !== ndata.username) {
    let u = await User.findOne({ username: ndata.username });
    if (u) {
      return { error: "User already exits" };
    } else {
      await User.updateOne({ email: ndata.email }, ndata);
      //update all the username in the payments
      await Payment.updateMany(
        { to_user: oldusername },
        { to_user: ndata.username }
      );
    }
  } else {
    await User.updateOne({ email: ndata.email }, ndata);
  }
};
