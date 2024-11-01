"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="z-50 flex w-full">
      <div className="w-full">
        <div className="flex flex-col justify-center items-center gap-4 px-2 md:px-0 text-white">
          <div className="flex justify-center text-center items-center">
            <div className="border-[1.5px] overflow-hidden bg-white border-sky-700 p-[3.2px] py-[6.4px] rounded-full invert">
              <Image
                src="/icons/logo.png"
                width={40}
                height={40}
                alt=""
                className=""
              />
            </div>
            <div className="md:text-5xl text-4xl font-bold font-mono">
              Linkster
            </div>
          </div>
          <p>
            A crowdfunding platform for creators. Get funded by your followers,
            friends and fans.
          </p>
          <div>
            <Link href={"/login"}>
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Start Now!
                </span>
              </button>
            </Link>
            <Link href={"/about"}>
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Read More
                </span>
              </button>
            </Link>
          </div>
        </div>
        <div className="text-white text-center pt-3">
          <div className="font-bold text-xl">Yours Fan Can Buy You a Chai</div>
          <div className="flex flex-col md:flex-row p-3 gap-2 justify-around">
            <div className="flex flex-col border-[1.2px] border-white rounded-3xl inset-0 backdrop-blur-sm bg-white/5 justify-center items-center text-center px-2 py-10">
              <Image src="/imgs/meeting.png" width={60} height={60} alt="..." />
              <span className="pt-3 font-bold">Fans wants to help</span>
              <span>Your fans are available to help you</span>
            </div>
            <div className="flex flex-col border-[1.2px] border-white rounded-3xl inset-0 backdrop-blur-sm bg-white/5 justify-center items-center text-center px-2 py-10">
              <Image src="/imgs/money.gif" width={80} height={80} alt="..." />
              <span className="font-bold">Fans wants to contribute</span>
              <span>Your fans are willing to contributr financially</span>
            </div>
            <div className="flex flex-col border-[1.2px] border-white rounded-3xl inset-0 backdrop-blur-sm bg-white/5 justify-center items-center text-center px-2 py-10">
              <Image src="/imgs/friends.png" width={60} height={80} alt="..." />
              <span className="pt-3 font-bold">Fans wants to collaborate</span>
              <span>Your fans are ready to collaborate with you</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
