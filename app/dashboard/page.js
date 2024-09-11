"use client";
import { React, useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, updateProfile } from "@/actions/useractoins";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [form, setform] = useState({});
  useEffect(() => {
    document.title = "Dashboard - Get Me A Chai";
    if (!session) {
      router.push("/login");
    } else {
      getData();
    }
  }, [router, session]);

  const getData = async () => {
    let u = await fetchuser(session.user.name);
    setform(u);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (data) => {
    let a = await updateProfile(data, session.user.name);
    toast("Profile Updated Succesfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <form
        className="container mx-auto w-full px-4 xl:w-[40%]"
        action={handleSubmit}
      >
        <h1 className="text-center font-bold text-xl p-6">
          Welcome To Your Dashboard
        </h1>
        <div className="flex flex-col gap-2">
          {/* input for name */}
          <div>
            <label htmlFor="name" className="pl-2">
              Name
            </label>
            <input
              value={form.name ? form.name : ""}
              onChange={handleChange}
              type="text"
              name="name"
              id="name"
              className="bg-zinc-600 border border-white w-full rounded-lg p-[4px]"
            ></input>
          </div>
          {/* input for email */}
          <div>
            <label htmlFor="email" className="pl-2">
              Email
            </label>
            <input
              value={form.email ? form.email : ""}
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              className="bg-zinc-600 border border-white w-full rounded-lg p-[4px]"
            ></input>
          </div>
          {/* input for username */}
          <div>
            <label htmlFor="username" className="pl-2">
              Username
            </label>
            <input
              value={form.username ? form.username : ""}
              onChange={handleChange}
              type="text"
              name="username"
              id="username"
              className="bg-zinc-600 border border-white w-full rounded-lg p-[4px]"
            ></input>
          </div>
          {/* input for profile picture */}
          <div>
            <label htmlFor="profilepic" className="pl-2">
              Profile Picture
            </label>
            <input
              value={form.profilepic ? form.profilepic : ""}
              onChange={handleChange}
              type="img"
              name="profilepic"
              id="profilepic"
              className="bg-zinc-600 border border-white w-full rounded-lg p-[4px]"
            ></input>
          </div>
          {/* input for cover picture */}
          <div>
            <label htmlFor="coverpic" className="pl-2">
              Cover Picture
            </label>
            <input
              value={form.coverpic ? form.coverpic : ""}
              onChange={handleChange}
              type="img"
              name="coverpic"
              id="coverpic"
              className="bg-zinc-600 border border-white w-full rounded-lg p-[4px]"
            ></input>{" "}
          </div>
          {/* input for razorpay id */}
          <div>
            <label htmlFor="razorpayid" className="pl-2">
              RazorPay ID
            </label>
            <input
              value={form.razorpayid ? form.razorpayid : ""}
              onChange={handleChange}
              type="text"
              name="razorpayid"
              id="razorpayid"
              className="bg-zinc-600 border border-white w-full rounded-lg p-[4px]"
            ></input>
          </div>
          {/* input for razorpay secret */}
          <div>
            <label htmlFor="razorpaysecret" className="pl-2">
              RazorPay Secret
            </label>
            <input
              value={form.razorpaysecret ? form.razorpaysecret : ""}
              onChange={handleChange}
              type="text"
              name="razorpaysecret"
              id="razorpaysecret"
              className="bg-zinc-600 border border-white w-full rounded-lg p-[4px]"
            ></input>
          </div>
          <div>
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Dashboard;
