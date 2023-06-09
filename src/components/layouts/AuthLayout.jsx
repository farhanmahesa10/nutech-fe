import React from "react";
import { MdArrowForward } from "react-icons/md";
const AuthLayouts = (props) => {
  const { children, navBg, title, bg, breadCrumbs, childrenPosition } = props;
  return (
    <main
      className={`min-h-screen  wrapper lg:bg-[url('./assets/images/bg-login.jpg')] bg-no-repeat ${
        childrenPosition === "left" && "bg-right"
      }  lg:bg-[size:100%_100%] `}
    >
      <div className="container  ">
        <div className="grid-template min-h-screen ">
          <div
            className={`h-full hidden lg:col-span-5 lg:flex items-center  ${
              childrenPosition === "right"
                ? "order-1 "
                : " order-2 lg:col-start-8  "
            }`}
          >
            <div>
              <div className="mt-[32px]  bg-slate-500/80 p-5">
                <h1 className="font-h1 ">Nutech Test</h1>
                <h1 className="font-h1 ">By, M. Farhan</h1>
                <div className=" px-2 rounded-[8px]">
                  <p className="mt-[24px] e font-lg font-semibold">
                    To login please use this account
                  </p>
                  <p>Username : admin</p>
                  <p>Password : 1234</p>
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
