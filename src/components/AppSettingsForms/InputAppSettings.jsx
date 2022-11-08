import { Label, Select } from "@shopify/polaris";
import React from "react";

const InputAppSettings = (props) => {
  return (
    <>
      <Label id="font">{props.name}
        <span style={{color: "red"}}>{props.special}</span>
      </Label>
      {props.children}
    </>
  );
};

export default InputAppSettings;
