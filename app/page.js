"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="z-50">
      <div className="flex flex-col justify-center items-center gap-4 min-h-[35vh] px-2 md:px-0 text-white">
        <div className="flex justify-center text-center items-center">
          <div className="md:text-5xl text-4xl font-bold">Get Me A Chai</div>
          <div className="-mt-5">
            <Image src="/imgs/chai.gif" width={80} height={80} alt="..." />
          </div>
        </div>
        <p>
          A crowdfunding platform for creators. Get funded by your followers,
          friends and fans.
        </p>
        <div>
          <Link href={"/login"}>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Start Now!
            </button>
          </Link>
          <Link href={"/about"}>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="text-white text-center pt-3">
        <div className="font-bold text-xl">Yours Fan Can Buy You a Chai</div>
        <div className="flex px-3 gap-2 justify-around">
          <div className="flex flex-col justify-center items-center text-center">
            <Image src="/imgs/meeting.png" width={60} height={60} alt="..." />
            <span className="pt-3 font-bold">Fans wants to help</span>
            <span>Your fans are available to help you</span>
          </div>
          <div className="flex flex-col justify-center items-center text-center">
            <Image src="/imgs/money.gif" width={80} height={80} alt="..." />
            <span className="font-bold">Fans wants to contribute</span>
            <span>Your fans are willing to contributr financially</span>
          </div>
          <div className="flex flex-col justify-center items-center text-center">
            <Image src="/imgs/friends.png" width={60} height={80} alt="..." />
            <span className="pt-3 font-bold">Fans wants to collaborate</span>
            <span>Your fans are ready to collaborate with you</span>
          </div>
        </div>
      </div>
    </div>
  );
}
