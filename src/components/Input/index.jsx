import React from "react";
import styles from "./input.module.css";

const Input = ({ type, label, state, setState, placeholder }) => {
  return (
    <div className={styles.inputWrapper}>
      <p className={styles.labelInput}>{label}</p>
      <input
        type={type}
        className={styles.customInput}
        value={state}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default Input;
