import React from "react";

const Input = (props) => {
  const {
    meta,
    id,
    htmlFor,
    defaultValue,
    label,
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
    inputClassName,
    autoComplete,
    onFocus,
    value,
  } = props;

  const getError = () => {
    if (meta) {
      if (meta?.touched && meta?.error) {
        return <span className="text-sm text-red-500 ">{meta?.error}</span>;
      }
    }
    return false;
  };

  return (
    <>
      <label className="block" htmlFor={htmlFor}>
        <span className="block text-sm font-medium ">{label}</span>
      </label>
      <div
        className={`bg-white border focus-within:border-1 ${
          !getError() ? "border-neutral-100" : "border-red-500"
        } rounded-[8px] focus-within:border-yellow-500 flex items-center `}
      >
        {leftIcon && (
          <div
            className={`pl-[16px]   ${leftIconClassName}`}
            onClick={onLeftIconCLick}
          >
            {leftIcon}
          </div>
        )}
        <input
          defaultValue={defaultValue}
          id={id}
          name={name}
          type={type}
          className={`py-[8px] px-[16px] w-full rounded-[8px]  focus:outline-none ${inputClassName}`}
          placeholder={placeholder}
          minLength={min}
          maxLength={max}
          onChange={onChange}
          onInput={onInput}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          disabled={disabled}
          readOnly={readOnly}
          onFocus={onFocus}
          autoComplete={autoComplete}
          value={value}
        />
        {rightIcon && (
          <div
            className={`pr-[16px] ${rightIconClassName}`}
            onClick={onRightIconCLick}
          >
            {rightIcon}
          </div>
        )}
      </div>

      {getError()}
    </>
  );
};

Input.defaultProps = {
  name: "",
  type: "text",
  min: null,
  max: null,
  parentClassName: "",
  label: "",
  placeholder: "",
  disabled: false,
  readOnly: false,
};

export default Input;
