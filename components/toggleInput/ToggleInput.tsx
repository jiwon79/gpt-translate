import styles from "./ToggleInput.module.scss";
import { InputHTMLAttributes } from "react";

interface ToggleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const ToggleInput = ({label}: ToggleInputProps) => {
  return (
    <label className={styles.container}>
      <p className={styles.label}>{label}</p>
      <input role="switch" type="checkbox" className={styles.input} />
    </label>
  );
};

export default ToggleInput;
