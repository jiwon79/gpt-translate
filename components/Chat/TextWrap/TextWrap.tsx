import styles from "./TextWrap.module.scss";

interface TextWrapProps {
  text: string;
  translateText: string;
  reTranslateText: string;
  isLastChat: boolean;
}

const TextWrap = ({text, translateText, reTranslateText, isLastChat}: TextWrapProps) => {
  const reTranslateTextWrap = isLastChat
    ? reTranslateText === ''
      ? 'loading...'
      : `(${reTranslateText})`
    : '';

  return (
    <div className={styles.text__wrap}>
      <p className={styles.text}>
        {text == '' ? 'loading...' : text}
      </p>
      <p className={styles.text__translate}>
        {translateText === '' ? 'loading...' : translateText}
      </p>
      <p className={styles.text__reTranslate}>
        {reTranslateTextWrap}
      </p>
    </div>
  );
}

export default TextWrap;
