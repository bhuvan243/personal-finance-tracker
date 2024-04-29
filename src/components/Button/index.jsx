import React from "react";
import styles from "./button.module.css";

const Button = ({ text, onClick, isBlue, disabled }) => {
  return (
    <div
      className={isBlue ? `${styles.btn} ${styles.btnBlue}` : styles.btn}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </div>
  );
};

export default Button;
