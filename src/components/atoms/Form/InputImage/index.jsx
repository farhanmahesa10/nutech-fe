import React, { useEffect, useRef, useState } from "react";
import { MdInsertPhoto, MdClose, MdOutlineInsertPhoto } from "react-icons/md";
const InputImage = (props) => {
  const { meta, defaultValue, widthRatio, heightRatio, rules, maxSize } = props;
  const inputRef = useRef();
  const [imgPreview, setImgPreview] = useState(defaultValue || "");

  useEffect(() => {
    setImgPreview(defaultValue);
  }, [defaultValue]);

  const getError = () => {
    if (meta) {
      if (meta.touched && meta.error) {
        return <span className="text-sm text-red-500">{meta.error}</span>;
      }
    }
    return false;
  };

  return (
    <>
      <div className="w-full h-full flex">
        <div
          className={`flex justify-center w-full h-full px-4 transition bg-no-repeat bg-center  bg-cover border  ${
            meta?.touched && meta?.error
              ? "border-red-500"
              : "border-neutral-100"
          }  border-dashed rounded-md
            appearance-none hover:border-gray-400 focus:outline-none relative `}
          style={{ backgroundImage: `url(${imgPreview})` }}
        >
          <span
            className={`flex items-center justify-center space-x-2 absolute  w-full h-full z-10 bg-slate-300/50 `}
          >
            <span className=" w-full align-middle items-center text-center ">
              <span className="flex justify-center font-lg">
                <MdOutlineInsertPhoto className="text-[40px]" />
              </span>
              <div className="font-medium text-gray-600 mt-[16px] ">
                <span className="text-neutral-500">Click to upload</span>
                <span className="text-neutral-500 "> or drag here</span>
              </div>
              <span className="font-sm text-neutral-500">{rules}</span>
            </span>
          </span>
          <input
            type="file"
            name={props.name}
            ref={inputRef}
            className="absolute  h-full w-full z-20 opacity-0 cursor-pointer"
            accept="image/*"
            onChange={(e) => {
              let file = e.target.files[0];
              if (file && file?.size < maxSize) {
                setImgPreview(URL.createObjectURL(file));
              } else {
                setImgPreview("");
              }
              if (props.onChange) {
                props.onChange(e);
              }
            }}
          />
        </div>
        {/* <div
        className={`mt-[32px] max-w-[280px] relative ${
          !imgPreview && "hidden"
        }`}
      >
        <span className={`w-full flex justify-end mt-4 `}>
          <span
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current.value = null;
              setImgPreview("");
            }}
            className="absolute z-30 right-2 top-2"
          >
            <MdClose className="p-[px] rounded-full bg-red-500 text-white cursor-pointer hover:opacity-80" />
          </span>
        </span>
        <img
          src={imgPreview}
          className={` aspect-[${widthRatio}/${heightRatio}] object-cover`}
          alt="Hero image"
        />
      </div> */}
      </div>
      {getError()}
    </>
  );
};

export default InputImage;
