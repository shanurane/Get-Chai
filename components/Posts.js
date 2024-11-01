"use client";
import React from "react";
import Script from "next/script";
import { useState, useEffect } from "react";
import Razorpay from "razorpay";
import { useSession } from "next-auth/react";
import {
  fetchuser,
  fetchpayments,
  initiate,
  fetchposts,
} from "@/actions/useractoins";
import { useSearchParams } from "next/navigation";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { fetchUser } from "@/actions/useractoins";

const PostsPage = ({ username }) => {
  const [currentuser, setcurrentUser] = useState({});
  const [posts, setposts] = useState({});
  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let u = await fetchuser(username);
    setcurrentUser(u);
    let dbposts = await fetchposts(username);
    setposts(dbposts);
  };

  return (
    <>
      <div className="flex flex-col w-full md:w-[80%] gap-2 justify-center items-center text-center md:mt-16">
        <div className="md:pl-10 flex flex-col w-full">
          {posts && posts.length > 0 ? (
            posts.map((p, i) => {
              return (
                <li
                  key={p._id}
                  className="flex gap-2 my-4 items-center justify-center w-full"
                >
                  <div className="post flex w-full md:w-auto">
                    <div className="hidden md:block w-full rounded-full m-2 md:mr-3 mt-5 md:m-4">
                      <Image
                        src={
                          currentuser.profilepic
                            ? currentuser.profilepic
                            : "/icons/person.png"
                        }
                        width={100}
                        height={100}
                        alt="..."
                        className="rounded-full w-10 h-10 md:w-14 md:h-14"
                      />
                    </div>
                    <div className="flex-col w-full">
                      <div className="flex w-full">
                        <div className="flex-col w-full items-start justify-start">
                          <div className="mt-3 name flex w-full items-center">
                            <div className="w-auto md:hidden rounded-full mr-2">
                              <Image
                                src={
                                  currentuser.profilepic
                                    ? currentuser.profilepic
                                    : "/icons/person.png"
                                }
                                width={100}
                                height={100}
                                alt="..."
                                className="rounded-full w-11 h-10"
                              />
                            </div>
                            <div className="flex flex-col justify-start items-start w-full">
                              <div>
                                <span className="font-bold text-base w-auto">
                                  {username}
                                </span>
                              </div>
                              <div>
                                <span className="text-base text-gray-500">
                                  @{p.name}
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-center items-center text-center pr-4">
                              <span className="flex justify-center items-center text-center pb-5  h-9 font-bold text-xl p-2 text-gray-500 hover:bg-white/10 rounded-full hover:cursor-pointer">
                                ...
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {p.postpic ? (
                        <div className="">
                          <div className="message font-semibold text-base">
                            <span>{p.message}</span>
                          </div>
                          <div className="postimg flex flex-col justify-center inset-0 bg-white/10 rounded-xl px-2 md:mr-4">
                            <div className="md:p-4">
                              <Image
                                src={p.postpic}
                                alt="Image Loading Error..."
                                className="rounded-2xl w-full"
                                width={100}
                                height={100}
                              />
                            </div>
                            <div className="w-full flex justify-between my-1 md:mx-1 md:mr-4 md:gap-3 text-gray-500 cursor-pointer">
                              <div className="flex justify-center hover:text-blue-600 gap-1">
                                <div className="w-10 h-10 p-2 hover:bg-opacity-15 hover:bg-blue-600 hover:rounded-full">
                                  <Image
                                    src="/icons/favorite.png"
                                    alt="Like"
                                    width={100}
                                    height={100}
                                  />
                                </div>
                                <div className="w-auto h-auto pt-2">
                                  <span className="text-sm md:text-base">
                                    20M
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-center hover:text-green-600 gap-1">
                                <div className="w-10 h-10 p-2 hover:bg-opacity-15 hover:bg-green-600 hover:rounded-full">
                                  <Image
                                    src="/icons/repeat.png"
                                    alt="Repeat"
                                    width={100}
                                    height={100}
                                  />
                                </div>
                                <div className="w-auto h-auto pt-2">
                                  <span className="text-sm md:text-base">
                                    91
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-center hover:text-red-600 gap-1">
                                <div className="w-10 h-10 p-2 hover:bg-opacity-15 hover:bg-red-600 hover:rounded-full">
                                  <Image
                                    src="/icons/comment.png"
                                    alt="comment"
                                    width={100}
                                    height={100}
                                  />
                                </div>
                                <div className="w-auto h-auto pt-2">
                                  <span className="text-sm md:text-base">
                                    3M
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-center hover:text-purple-500 gap-1">
                                <div className="w-10 h-10 py-2 p-2 hover:bg-opacity-15 hover:bg-purple-600 hover:rounded-full">
                                  <Image
                                    src="/icons/bookmark.png"
                                    alt="Bookmark"
                                    width={100}
                                    height={100}
                                  />
                                </div>
                                <div className="w-auto h-auto pt-2">
                                  <span className="text-sm md:text-base">
                                    3M
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-center hover:text-yellow-600 gap-1">
                                <div className="w-10 h-10 p-2 hover:bg-opacity-15 hover:bg-yellow-600 hover:rounded-full">
                                  <Image
                                    src="/icons/share.png"
                                    alt="Share"
                                    width={100}
                                    height={100}
                                  />
                                </div>
                                <div className="w-auto h-auto pt-2">
                                  <span className="text-sm md:text-base">
                                    3M
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="message font-semibold text-base">
                          <span>{p.message}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <span>No Post Yet </span>
          )}
        </div>
      </div>
    </>
  );
};

export default PostsPage;
