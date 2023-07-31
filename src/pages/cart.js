import React, { useEffect } from "react";
import Header from "../components/Header";
import Image from "next/image";
import CheckoutProduct from "../components/CheckoutProduct";
import { useSelector } from "react-redux";

import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";
import {loadStripe} from "@stripe/stripe-js"
import { useRouter } from "next/router";
const stripePromise = loadStripe()


import { selectItems, selesctTotal } from "../slices/basketSlice";

function checkout() {
  const router = useRouter();
  const items = useSelector(selectItems);
  const { data: session } = useSession();
  const total = useSelector(selesctTotal);

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
      firstname: "ogundele",
      lastname: "caleb",
      redirectUrl: "http://paylode.com",
    //   phonenumber: phoneNumber,
      publicKey: "PLPK_ZV9RZDagXU2FA_aLNSUNyw",
      email: "ogundelecaleb13@gmail.com",
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

  const createCheckoutSession = () =>{

  }
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto ">
        {/* left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is Empty"
                : "Shopping basket"}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                ranting={item.rating}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
            ;
          </div>
        </div>
        {/* right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2>
                Subtotal ({items.length} items) :{" "}
                <span className="font-bold">
                  <Currency quantity={total} currency="NGN" />
                </span>
              </h2>
              <button
             onClick={Checkout}
              role="link" 
                // disabled={session}
                className={`button mt-2 ${
                  !session &&
                  "from-blue-300 to-blue-500 border-gray-200 text-gray-300 "
                }`}
              >
                {!session ? "Sign in to checkout " : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default checkout;
