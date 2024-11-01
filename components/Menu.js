"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

const Menu = (params) => {
  const [showSidebar, setshowSidebar] = useState(false);
  const { data: session } = useSession();

  const handleToggle = () => {
    setshowSidebar(!showSidebar);
  };

  if (!session) {
    return null;
  }
  // useEffect(() => {
  //   if (params.flexing === "col") {
  //     setshowSidebar(false);
  //   }
  // }, []);

  return (
    <div
      className={`${
        params.flexing === "col"
          ? "fixed bottom-0 left-0 w-full"
          : "sticky left-0 top-0"
      }`}
    >
      <div className={`w-full flex flex-row md:min-h-screen`}>
        <div className="w-full md:min-h-screen">
          <div className="md:min-h-screen">
            <div
              className={`w-full ${
                params.flexing === "col" ? "hidden" : "block"
              } justify-start p-3`}
            >
              <div
                onClick={handleToggle}
                className="border-[1.5px] w-12 h-12 overflow-hidden bg-white border-sky-700 p-[3.2px] py-[6px] rounded-full invert"
              >
                <Image
                  src="/icons/logo.png"
                  width={40}
                  height={40}
                  alt=".."
                  className="h-full w-full"
                />
              </div>
            </div>
            <div className="">
              <ul
                className={`hover:"block" ${
                  showSidebar ? "block" : "hidden"
                } min-h-screen flex flex-col ${
                  params.flexing === "col" ? "hidden" : "block"
                } justify-start items-start gap-10 p-1 pt-4 px-5 pr-12 inset-0 backdrop-blur-sm bg-white/5 rounded-xl`}
              >
                <li>
                  <Link
                    href={"/"}
                    className="flex justify-start items-center gap-3"
                  >
                    <Image
                      src="/icons/home.png"
                      width={30}
                      height={30}
                      alt=".."
                    />
                    <span>Home</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href={"/messanger"}
                    className="flex justify-start items-center gap-3"
                  >
                    <Image
                      src="/icons/chat.png"
                      width={30}
                      height={30}
                      alt=".."
                    />
                    <span>Message</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/post"}
                    className="flex justify-start items-center  gap-3"
                  >
                    <Image
                      src="/icons/post.png"
                      width={30}
                      height={30}
                      alt=".."
                    />
                    <span>Posts</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/friends"}
                    className="flex justify-start items-center gap-3"
                  >
                    <Image
                      src="/icons/person.png"
                      width={30}
                      height={30}
                      alt=".."
                    />
                    <span>Friends</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/notifications"}
                    className="flex justify-start items-center gap-3"
                  >
                    <Image
                      src="/icons/notifications.png"
                      width={30}
                      height={30}
                      alt=".."
                    />
                    <span>Notification</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/groups"}
                    className="flex justify-start items-center gap-3"
                  >
                    <Image
                      src="/icons/group.png"
                      width={30}
                      height={30}
                      alt=".."
                    />
                    <span>Groups</span>
                  </Link>
                </li>
              </ul>

              {!showSidebar && (
                <ul
                  className={`flex ${
                    params.flexing === "col"
                      ? "flex-row pb-2 "
                      : "flex-col min-h-screen"
                  } md:justify-start justify-around items-start gap-2 md:gap-10 p-1 pt-4 md:px-5 md:pr-5 inset-0 backdrop-blur-sm bg-white/5 rounded-xl`}
                >
                  <li>
                    <Link
                      href={"/"}
                      className="flex justify-start items-center gap-3"
                    >
                      <Image
                        src="/icons/home.png"
                        width={30}
                        height={30}
                        alt=".."
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/messanger"}
                      className="flex justify-start items-center gap-3"
                    >
                      <Image
                        src="/icons/chat.png"
                        width={30}
                        height={30}
                        alt=".."
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/post"}
                      className="flex justify-start items-center gap-3"
                    >
                      <Image
                        src="/icons/post.png"
                        width={30}
                        height={30}
                        alt=".."
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/friends"}
                      className="flex justify-start items-center gap-3"
                    >
                      <Image
                        src="/icons/person.png"
                        width={30}
                        height={30}
                        alt=".."
                      />
                    </Link>
                  </li>
                  <li className="hidden md:block">
                    <Link
                      href={"/notifications"}
                      className="flex justify-start items-center gap-3"
                    >
                      <Image
                        src="/icons/notifications.png"
                        width={30}
                        height={30}
                        alt=".."
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/groups"}
                      className="flex justify-start items-center gap-3"
                    >
                      <Image
                        src="/icons/group.png"
                        width={35}
                        height={30}
                        alt=".."
                      />
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
