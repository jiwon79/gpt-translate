import styles from "./ButtonWrap.module.scss";
import { Language } from "@/lib/utils/constant";

interface ButtonWrapProps {
  onTapEditButton: () => void;
  onTapFeedbackButton: () => void;
  onTapDeleteButton: () => void;
  isLastChat: boolean;
  language: Language;
}

const ButtonWrap = ({
                      onTapEditButton,
                      onTapFeedbackButton,
                      onTapDeleteButton,
                      isLastChat,
                      language,
                    }: ButtonWrapProps) => {
  if (!isLastChat) return <></>;

  const editString = language === Language.EN ? "Edit" : "수정";
  const feedbackString = language === Language.EN ? "Feedback" : "피드백";
  const deleteString = language === Language.EN ? "Delete" : "삭제";

  return (
    <div className={styles.button__wrap}>
      <button className={`${styles.button} ${styles.edit}`} onClick={onTapEditButton}>
        <p>{editString}</p>
      </button>
      <button className={`${styles.button} ${styles.feedback}`} onClick={onTapFeedbackButton}>
        <p>{feedbackString}</p>
      </button>
      <button className={`${styles.button} ${styles.delete}`} onClick={onTapDeleteButton}>
        <p>{deleteString}</p>
      </button>
    </div>
  );
}

export default ButtonWrap;
