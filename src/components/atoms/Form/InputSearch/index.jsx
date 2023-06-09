import React from "react";

const InputSearch = (props) => {
  const {
    name,
    type,
    min,
    max,
    onChange,
    leftIcon,
    rightIcon,
    placeholder,
    disabled,
    readOnly,
    onInput,
    onKeyDown,
    onKeyUp,
    onLeftIconCLick,
    onRightIconCLick,
    rightIconClassName,
    leftIconClassName,
    btnClassName,
    inpRef,
  } = props;
  return (
    <div className="border focus-within:border-1 border-neutral-100 rounded-[8px] bg-white focus-within:border-yellow-500 flex items-center ">
      {leftIcon && (
        <div
          className={`pl-[16px] ${leftIconClassName}`}
          onClick={onLeftIconCLick}
        >
          {leftIcon}
        </div>
      )}
      <input
        ref={inpRef}
        type={type}
        className="py-[8px] px-[16px] w-full rounded-[8px]  focus:outline-none "
        placeholder={placeholder}
        min={min}
        max={max}
        onChange={onChange}
        onInput={onInput}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        disabled={disabled}
        readOnly={readOnly}
        name={name}
      />

      <div
        className={`pr-[4px]  ${rightIconClassName}`}
        onClick={onRightIconCLick}
      >
        <button
          type="submit"
          className={`btn py-2 bg-blue-500 font-xs text-white ${btnClassName}`}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default InputSearch;
