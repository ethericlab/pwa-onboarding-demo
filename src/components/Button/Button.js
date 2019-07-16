import React from "react";
import s from "./Button.module.scss";

export const Button = ({ children, className = '', ...props }) => (
  <button {...props} className={`${s.button} ${className}`} >
    {children}
  </button>
);
