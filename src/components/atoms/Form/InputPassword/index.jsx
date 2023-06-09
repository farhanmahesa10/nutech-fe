import React, { useState } from "react";
import FormControl from "../FormControl";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
const InputPassword = (props) => {
  const { ...rest } = props;
  const [show, setShow] = useState(false);
  return (
    <>
      <FormControl
        control="input"
        {...rest}
        type={show ? "text" : "password"}
        rightIcon={
          show ? (
            <MdVisibility className="text-neutral-200 cursor-pointer" />
          ) : (
            <MdVisibilityOff className="text-neutral-200 cursor-pointer " />
          )
        }
        onRightIconCLick={() => {
          setShow(!show);
        }}
      />
    </>
  );
};

export default InputPassword;
