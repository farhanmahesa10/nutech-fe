import React from "react";
import Input from "./Input";
import InputImage from "./InputImage";
import InputPassword from "./InputPassword";
import InputSearch from "./InputSearch";

const FormControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "password":
      return <InputPassword {...rest} />;
    case "search":
      return <InputSearch {...rest} />;
    case "image":
      return <InputImage {...rest} />;

    default:
      return null;
  }
};

export default FormControl;
