import { InputHTMLAttributes } from "react";
import styles from "./TextInput.module.scss";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  deleteAction?: () => void;
}

const TextInput = ({label, deleteAction, ...props}: TextInputProps) => {
  return (
    <label className={styles.container}>
      <p className={styles.label}>{label}</p>
      <input {...props} className={styles.input}/>
      {deleteAction &&
        <button onClick={deleteAction} className={styles.button}>
          <div>✕</div>
        </button>
      }

    </label>
  );
}

export default TextInput;
