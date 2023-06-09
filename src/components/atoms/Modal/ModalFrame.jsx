import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
const ModalFrame = (props) => {
  const { open, setOpen } = props;

  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[90] "
        initialFocus={cancelButtonRef}
        onClose={() => {
          if (setOpen) {
            setOpen(false);
          }
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-50 inset-0 overflow-y-auto bg-[#344054]/20   backdrop-blur-[6px]">
          <div className="flex items-center justify-center min-h-full p-4  ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative  transform transition-all    ${props.frameClassName}`}
                onClick={() => {
                  if (setOpen) {
                    setOpen(false);
                  }
                }}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className=""
                >
                  {props.children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalFrame;
