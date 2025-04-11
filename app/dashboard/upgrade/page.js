"use client"

import { PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";

function Upgrade() {
  const onPaymentSuccess = async () => {
    //const res = await userUpgradePlan({ userEmail: user?.primaryEmailAddress?.emailAddress })
   // const res = await userUpgradePlan({ userEmail: 'vikaskumar.vk0612@gmail.com' })
    console.log("payment success");
  };

  return (
    <div>
    <h2 className="font-medium text-3xl">Plans</h2>
    <p>Update your plan to upload multiple pdf to take note</p>

    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
        <div className="rounded-2xl border border-indigo-600 p-6 shadow-xs ring-1 ring-indigo-600 sm:order-last sm:px-8 lg:p-12">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900">
              Unlimited
              <span className="sr-only">Plan</span>
            </h2>

            <p className="mt-2 sm:mt-4">
              <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {" "}
                5 ${" "}
              </strong>

              <span className="text-sm font-medium text-gray-700">
                /One Time
              </span>
            </p>
          </div>

          <ul className="mt-6 space-y-2">
            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700 shadow-sm"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> Unlimited PDF Uploading </span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700 shadow-sm"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> Unlimited Note Taking</span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700 shadow-sm"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> Email support </span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700 shadow-sm"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> Help center access </span>
            </li>
          </ul>
          <div className="mt-5">
            <PayPalButtons
              onApprove={() => onPaymentSuccess()}
              onCancel={() => console.log("Payment Cancel")}
              createOrder={(data, actions) => {
                // console.log('data :',data);
                // console.log('actions :',actions);
                return actions?.order?.create({
                  purchase_units: [
                    {
                      amount: {
                        value: 5,
                        currency_code: "USD",
                      },
                    },
                  ],
                });
              }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 p-6 shadow-xs sm:px-8 lg:p-12">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900">
              Free
              <span className="sr-only">Plan</span>
            </h2>
          </div>

          <ul className="mt-6 space-y-2">
            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700 shadow-sm"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> 5 PDF Upload </span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700 shadow-sm"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> Unlimited Note Taking </span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700 shadow-sm"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> Email support </span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700 shadow-sm"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> Help center access </span>
            </li>
          </ul>

          <a
            href="#"
            className="mt-8 block rounded-full border border-indigo-600 bg-white px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:ring-3 focus:outline-hidden"
          >
            Current Plan
          </a>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Upgrade;
