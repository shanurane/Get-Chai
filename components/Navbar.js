"use client";
import { React, useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser } from "@/actions/useractoins";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();
  const [showdropdown, setshowdropdown] = useState("hidden");
  const [form, setform] = useState({});
  const router = useRouter();

  useEffect(() => {
    document.title = "Dashboard - Get Connect";
    if (session) {
      getData();
    }
  }, [router, session]);

  const getData = async () => {
    let u = await fetchuser(session.user.name);
    setform(u);
  };

  const changedropdown = () => {
    showdropdown === "hidden" ? setshowdropdown("") : setshowdropdown("hidden");
  };

  const changedropdownblur = async () => {
    setTimeout(() => {
      setshowdropdown("hidden");
    }, 500);
  };

  return (
    <nav className="relative w-full text-white flex flex-row justify-end items-center text-center p-2">
      {!session && (
        <div>
          <Link href="/">
            <div className="border-[1.5px] overflow-hidden bg-white border-sky-700 p-[3.2px] py-[6px] rounded-full invert">
              <Image
                src="/icons/logo.png"
                width={40}
                height={40}
                alt=""
                className=""
              />
            </div>
          </Link>
        </div>
      )}
      {/* <div className="md:hidden">
        <Link href="/">
          <div className="border-[1.5px] overflow-hidden bg-white border-sky-700 p-[3.2px] py-[6px] rounded-full invert">
            <Image src="/icons/logo.png" width={40} height={40} className="" />
          </div>
        </Link>
      </div> */}
      <div className="w-full flex justify-end relative">
        {session && (
          <div className="flex gap-2">
            <div className="border-[1.5px] border-white overflow-hidden rounded-full min-h-full">
              <Image
                src={form.profilepic ? form.profilepic : "/icons/person.png"}
                className="rounded-full min-h-full"
                alt=""
                width={40}
                height={100}
              />
            </div>
            <div>
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                type="button"
                onClick={changedropdown}
                onBlur={changedropdownblur}
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Profile
                </span>
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
                className={`absolute right-2 mt-2 z-10 ${showdropdown} divide-y divide-gray-100 rounded-lg shadow w-44 border-[1px] backdrop-blur-sm bg-white/5 border-white `}
              >
                <ul
                  className="py-2 text-sm text-purple-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 font-bold dark:hover:text-orange-600"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href={`${session.user.name}`}
                    className="block px-4 py-2 font-bold dark:hover:text-orange-600"
                  >
                    Your Page
                  </Link>
                  <Link
                    href="/about"
                    className="block px-4 py-2 font-bold dark:hover:text-orange-600"
                  >
                    About
                  </Link>
                  <div>
                    <button
                      type="button"
                      onClick={() => signOut()}
                      className="text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
                    >
                      logout
                    </button>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        )}
        {!session && (
          <div>
            <Link
              href="/login"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Login
              </span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
