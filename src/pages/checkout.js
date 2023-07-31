import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import Script from "next/script";
import { useSession } from "next-auth/react";
import { selectItems, selesctTotal } from "../slices/basketSlice";
import {PaylodeCheckout} from "paylode-checkout"

const Checkout = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    // const { data: session } = useSession();
    const total = useSelector(selesctTotal);
    // useEffect(() => {
    //   if (session) {
    //     setName(session.user.name);
    //   }
    // });

  useEffect(() => {
    const script = document.createElement("script");
    // script.src = "https://checkout.paylodeservices.com/checkout.js";
    script.src = "http://94.229.79.27:8451/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const Checkout = (event) => {
    event.preventDefault();

    var handler = PaylodeCheckout.setup({
      firstname: name,
      lastname: name,
      redirectUrl: "http://paylode.com",
    //   phonenumber: phoneNumber,
      publicKey: "PLPK_ZV9RZDagXU2FA_aLNSUNyw",
      email: email,
      amount: total,
      currency: "NGN",
      onClose: function (data) {
        alert("iFRAME CLOSED Now");
        console.log("Returned data:", data);
        console.log("iframeId", document.getElementById("iframeId"));
      },
      onSuccess: function (data) {
        console.log("Returned data:", data);
      },
    });
    handler.openIframe();
  };

  return (
    <div>
      `<Header />`
      {/* <script src="https://checkout.paylodeservices.com/checkout.js"></script> */}
      <main className="max-w-screen-2xl mx-auto">
        <div>
          <div className="col-span-12 sm:col-span-6 ">
            <p className="text-[#718096] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]">
             Name
            </p>
            <input
              type="text"
              className="block w-full  h-14 px-4 py-[13.5px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
              placeholder="0"
              autofocus
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-span-12 sm:col-span-6 ">
            <p className="text-[#718096] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]">
              Email
            </p>
            <input
              type="text"
              className="block w-full  h-14 px-4 py-[13.5px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
              placeholder="0"
              autofocus
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button onClick={Checkout}> click me</button>

        </div>
      </main>
    </div>
  );
};

export default Checkout;
