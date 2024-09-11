"use client";
import React from "react";
import Script from "next/script";
import { useState, useEffect } from "react";
import Razorpay from "razorpay";
import { useSession } from "next-auth/react";
import { fetchuser, fetchpayments, initiate } from "@/actions/useractoins";
import { useSearchParams } from "next/navigation";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PaymentPage = ({ username }) => {
  const [paymentform, setpaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [currentuser, setcurrentUser] = useState({});
  const [payments, setPayments] = useState({});
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchParams.get("paymentdone") == "true") {
      toast("ThankYou for donation", {
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
    }
    router.push(`/${username}`);
  }, []);

  const handleChange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    let u = await fetchuser(username);
    setcurrentUser(u);
    let dbpayments = await fetchpayments(username);
    setPayments(dbpayments);
  };

  const pay = async (amount) => {
    //const {data:session}=useSession();
    //Get the order ID

    let a = await initiate(amount, username, paymentform);
    let orderId = a.id;
    const options = {
      key: currentuser.razorpayid, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Get A Chai", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer contact information especially their phone number
        name: "Gaurav Kumar", //your customer name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
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
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="flex flex-col items-center">
        <div className="w-full relative">
          <Image
            src={currentuser.coverpic}
            alt="get soon..."
            layout="responsive"
            width={100}
            height={50}
          />
          <div className="absolute rounded-full -bottom-14 right-[36%] md:right-[45.6%]">
            <Image
              src={currentuser.profilepic}
              className="rounded-full"
              alt="get soon..."
              width={112}
              height={112}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 justify-center text-center mt-16">
          <h1 className="font-bold text-xl">@{username}</h1>
          <span className="text-sm text-zinc-500">
            Lets help {currentuser.name} get a chai!
          </span>
          <span className="text-sm text-zinc-400">
            {payments.length} payments . ₹
            {Object.keys(payments).reduce((a, b) => a + payments[b].amount, 0)}
            {" raised"}
          </span>
        </div>
        <div className="payments w-[90%] md:w-[80%] flex flex-col md:flex-row md:gap-3 justify-center gap-2 py-2">
          <div className="supporters w-full md:w-1/2 bg-zinc-700 p-4 rounded-lg">
            <h1 className="font-bold">Supporters</h1>
            <div className="ml-3 flex flex-col">
              {payments && payments.length > 0 ? (
                payments.map((p, i) => {
                  return (
                    <li key={i} className="flex gap-2 my-4 items-center">
                      <Image
                        className="rounded-full"
                        src="/imgs/profilepic.png"
                        alt="..."
                        width={30}
                        height={30}
                      />
                      <span>
                        {p.name} donated
                        <span className="font-bold"> ₹{p.amount} </span>
                        with a message &quot;{p.message}&quot;
                      </span>
                    </li>
                  );
                })
              ) : (
                <span>No supporters yet</span>
              )}
            </div>
          </div>
          <div className="makePayments w-full md:w-1/2 bg-zinc-700 p-4 rounded-lg">
            <h1 className="font-bold">Make Payment</h1>
            <div>
              <div className="flex mb-2 gap-2">
                <input
                  type="text"
                  onChange={handleChange}
                  value={paymentform.name}
                  name="name"
                  placeholder="Enter Name"
                  className="bg-zinc-600 border border-white rounded-lg py-2 px-2 w-full"
                />
              </div>
              <div className="flex mb-2 gap-2">
                <input
                  type="text"
                  onChange={handleChange}
                  value={paymentform.message}
                  name="message"
                  placeholder="Enter Message"
                  className="bg-zinc-600 border border-white rounded-lg py-2 px-2 w-full"
                />
              </div>
              <div className="flex mb-2 gap-2">
                <input
                  type="text"
                  onChange={handleChange}
                  value={paymentform.amount}
                  name="amount"
                  placeholder="Enter Amount"
                  className="bg-zinc-600 border border-white rounded-lg py-2 px-2 w-full"
                />

                <button
                  type="button"
                  onClick={() => pay(Number.parseInt(paymentform.amount) * 100)}
                  className="text-white disabled:bg-purple-400 disabled:hover:cursor-not-allowed disabled:from-purple-500 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
                  disabled={
                    paymentform.name?.length < 3 ||
                    paymentform.amount?.length < 1
                  }
                >
                  Pay
                </button>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={() => pay(5000)}
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
              >
                ₹50
              </button>
              <button
                type="button"
                onClick={() => pay(10000)}
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
              >
                ₹100
              </button>
              <button
                type="button"
                onClick={() => pay(50000)}
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
              >
                ₹500
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
