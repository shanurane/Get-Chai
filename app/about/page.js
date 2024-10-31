"use client";
import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <div className="border-[1.5px] w-24 h-[94px] overflow-hidden bg-white border-sky-700 p-[3.2px] py-[6px] rounded-full invert">
        <Image
          src="/icons/logo.png"
          width={100}
          height={100}
          className="h-full w-full"
        />
      </div>{" "}
      <div className="max-w-3xl flex-col items-center w-full text-center">
        <h1 className="text-4xl font-bold mb-4">About Linkster</h1>
        <p className="text-lg text-zinc-300 mb-6">
          Linkster is a social media platform designed to help you connect with
          friends, share posts, and discover new communities. Whether you&apos;re
          looking to stay updated with the latest news, chat with friends, or
          find new interest groups, Linkster makes it easy and fun.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Features</h2>
        <ul className="list-disc list-inside text-left text-zinc-300 mb-6">
          <li>Create and share posts with your network.</li>
          <li>Send messages to friends and join group chats.</li>
          <li>Receive notifications about updates and interactions.</li>
          <li>Join groups to connect with people who share your interests.</li>
          <li>Explore content through an easy-to-use interface.</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-lg text-zinc-300 mb-6">
          Our mission is to bring people closer together by providing a platform
          where everyone can connect, share ideas, and build communities. We
          believe in the power of social interactions to make the world a more
          connected place.
        </p>
        <h2 className="text-2xl font-semibold mb-2">The Team</h2>
        <p className="text-lg text-zinc-300 mb-6">
          Linkster is built by a team of passionate developers and designers who
          aim to create a user-friendly and engaging social media experience. We
          continuously work to improve the app based on user feedback and
          evolving trends.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
        <p className="text-lg text-zinc-300">
          Have questions, feedback, or just want to say hi? Feel free to contact
          us at{" "}
          <a href="mailto:support@linkster.com" className="text-sky-700">
            support@linkster.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default About;
