import React from "react";
import { ModalFrame } from "../../atoms";

const ModalDialogConfirmation = ({
  open,
  setOpen,
  title,
  desc,
  trueLabel,
  falseLabel,
  onConfirm,
  descClassName,
}) => {
  return (
    <ModalFrame
      open={open}
      setOpen={setOpen}
      frameClassName=" max-w-[540px] w-full"
    >
      <div className="p-[16px] text-start  max-w-[540px] w-full">
        <div className="bg-red-400 rounded-t-[16px] py-[16px] px-[24px] ">
          <h5 className="font-h6 md:font-h5 text-white">{title}</h5>
        </div>
        <div className={`p-[24px] bg-white `}>
          <p className={`font-template ${descClassName}`}>{desc}</p>
        </div>
        <div className="bg-white rounded-b-[16px] py-[16px] px-[24px] border-t border-neutral-100 flex justify-end gap-[16px]">
          <button
            className="btn bg-white border font-template h-fit py-[6px]"
            type={"button"}
            onClick={() => setOpen(false)}
          >
            {falseLabel || "Batal"}
          </button>
          <button
            className="btn h-fit bg-red-400 text-white py-[6px] border border-red-400"
            onClick={onConfirm}
            type="button"
          >
            {trueLabel || "Konfirmasi"}
          </button>
        </div>
      </div>
    </ModalFrame>
  );
};

export default ModalDialogConfirmation;
