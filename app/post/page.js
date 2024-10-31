"use client";
import { React, useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createpost, updateProfile } from "@/actions/useractoins";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = ({ username }) => {
  const { data: session, update } = useSession();
  const [postform, setpostform] = useState({
    name: "",
    message: "",
    postpic: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setpostform({ ...postform, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (data) => {
    let a = await createpost(postform, session.user.name);
    toast("Post Created Succesfully!", {
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
    router.push(`/${session.user.name}`);
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
        className="container mx-auto w-full px-8 xl:w-[50%] inset-0 backdrop-blur-sm bg-white/5 rounded-xl"
        action={handleSubmit}
      >
        <h1 className="text-center font-bold text-xl p-6">
          Create Your Post Here...
        </h1>
        <div className="flex flex-col gap-2">
          {/* input for name */}
          <div>
            <label htmlFor="name" className="pl-2">
              Tags
            </label>
            <input
              value={postform.name ? postform.name : ""}
              onChange={handleChange}
              type="text"
              name="name"
              id="name"
              className="bg-transparent border border-white w-full rounded-lg p-[4px]"
            ></input>
          </div>
          {/* input for post picture */}
          <div>
            <label htmlFor="profilepic" className="pl-2">
              Post Image
            </label>
            <input
              value={postform.postpic ? postform.postpic : ""}
              onChange={handleChange}
              type="text"
              name="postpic"
              id="postpic"
              className="bg-transparent border border-white w-full rounded-lg p-[4px]"
            ></input>
          </div>
          {/* input for cover picture */}
          <div>
            <label htmlFor="message" className="pl-2">
              Write Something here...
            </label>
            <input
              value={postform.message ? postform.message : ""}
              onChange={handleChange}
              type="text"
              name="message"
              id="message"
              className="bg-transparent border border-white w-full rounded-lg p-[4px]"
            ></input>{" "}
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Save
              </span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreatePost;
