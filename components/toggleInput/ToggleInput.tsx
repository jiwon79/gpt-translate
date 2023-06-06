import styles from "./ToggleInput.module.scss";

interface ToggleInputProps {
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
