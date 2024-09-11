"use client";
import { React, useState, useeffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();
  const [showdropdown, setshowdropdown] = useState("hidden");

  const changedropdown = () => {
    showdropdown === "hidden" ? setshowdropdown("") : setshowdropdown("hidden");
  };
  const changedropdownblur = async () => {
    await setTimeout(() => {
      showdropdown === "hidden"
        ? setshowdropdown("")
        : setshowdropdown("hidden");
    }, 500);
  };

  return (
    <nav className="bg-zinc-900 relative text-white flex flex-row justify-between items-center text-center p-2">
      <div>
        <Link
          href={"/"}
          className="flex justify-center items-center text-center"
        >
          <div className="mb-2">
            <Image src="/imgs/chai.gif" width={30} height={30} alt="..." />
          </div>
          <span className="font-bold text-xl cursor-pointer">Chai</span>
        </Link>
      </div>
      <div className="flex gap-4 relative">
        {session && (
          <div>
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
              type="button"
              onClick={changedropdown}
              onBlur={changedropdownblur}
            >
              Welcome{" "}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdown"
              className={`absolute mt-2 z-10 ${showdropdown} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-purple-700`}
            >
              <ul
                className="py-2 text-sm text-purple-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-purple-600 dark:hover:text-white"
                >
                  Dashboard
                </Link>
                <Link
                  href={`${session.user.name}`}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-purple-600 dark:hover:text-white"
                >
                  Your Page
                </Link>
                <Link
                  href="/about"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-purple-600 dark:hover:text-white"
                >
                  About
                </Link>
              </ul>
            </div>
          </div>
        )}
        {session && (
          <div>
            <button
              type="button"
              onClick={() => signOut()}
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
            >
              logout
            </button>
          </div>
        )}
        {!session && (
          <div>
            <Link
              href="/login"
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
