import { InputHTMLAttributes } from "react";
import styles from "./TextInput.module.scss";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const TextInput = ({ label, ...props }: TextInputProps) => {
  return (
    <label className={styles.container}>
      <p className={styles.label}>{label}</p>
      <input {...props} className={styles.input} />
    </label>
  );
}

export default TextInput;
