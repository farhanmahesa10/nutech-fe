import React, { Children } from "react";

const OffCanvasFrame = (props) => {
  const { open, setOpen, children } = props;
  return (
    <div
      className={`bg-[#344054]/20 backdrop-blur-[6px] ${
        open ? "left-0" : "left-full"
      } right-0 top-0 bottom-0   z-[99] fixed  `}
      onClick={() => {
        setOpen(false);
      }}
    >
      <div
        className={`absolute right-0 h-full bg-white ${
          open ? "min-w-[306px] " : "min-w-[0px]   "
        }  transition-all duration-300  w-0  shadow-medium overflow-x-hidden overflow-y-auto`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default OffCanvasFrame;
