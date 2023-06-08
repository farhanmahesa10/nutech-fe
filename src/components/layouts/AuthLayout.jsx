import React from "react";
import { MdArrowForward } from "react-icons/md";
const AuthLayouts = (props) => {
  const { children, navBg, title, bg, breadCrumbs, childrenPosition } = props;
  return (
    <main
      className={`min-h-screen  wrapper bg-[url('./assets/images/bg-login.jpg')] bg-no-repeat ${
        childrenPosition === "left" && "bg-right"
      } bg-[size:50%_100%] `}
    >
      <div className="container  ">
        <div className="grid-template min-h-screen">
          <div
            className={`h-full hidden lg:col-span-5 lg:flex items-center  ${
              childrenPosition === "right"
                ? "order-1 "
                : " order-2 lg:col-start-8  "
            }`}
          >
            <div>
              <div className="mt-[32px]  ">
                <h1 className="font-h1 ">Nutech Test</h1>
                <h1 className="font-h1 ">By, M. Farhan</h1>
                <div className="bg-yellow-500 px-2 rounded-[8px]">
                  <p className="mt-[24px] e font-lg font-semibold">
                    To login please use this account
                  </p>
                  <p>Username : admin001</p>
                  <p>Password : 1234</p>
                </div>
              </div>
              <div className="my-[32px] flex gap-4 items-center">
                <div>
                  <img src="/images/bg-login.jpg" alt="atlaz people" />
                </div>
                <div className="max-w-[263px]">
                  <p className="">
                    Atlaz Book has been used by over 100,000 students in
                    Indonesia.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={` h-full relative col-span-4 md:col-start-2 md:col-span-6 ${
              childrenPosition === "right"
                ? " lg:col-start-8 lg:col-span-5 order-2"
                : "lg:col-span-5 order-1"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthLayouts;
