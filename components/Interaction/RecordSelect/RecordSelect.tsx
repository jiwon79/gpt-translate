import { Language } from "@/lib/utils/constant";
import MicEmpty from "@/components/Svg/MicEmpty";

import styleGuide from "@/styles/styleGuide.module.scss";
import styles from "./RecordSelect.module.scss";

interface RecordSelectProps {
  handleRecording: (language: Language) => void;
}

const RecordSelect = ({ handleRecording }: RecordSelectProps) => {
  return (
    <div className={styles.button__wrap}>
      <button
        className={styles.button}
        onClick={() => handleRecording(Language.EN)}
      >
        <div className={styles.icon__wrap}>
          <p>English</p>
          <div className={`${styles.icon__mic} ${styles.english}`}>
            <MicEmpty color={styleGuide.blue} />
          </div>
        </div>
      </button>

      <p className={styles.text__guide}>
        마이크 버튼을<br />
        누르고 말하세요.
      </p>

      <button
        className={styles.button}
        onClick={() => handleRecording(Language.KO)}
      >
        <div className={styles.icon__wrap}>
          <p>한국어</p>
          <div className={`${styles.icon__mic} ${styles.korea}`}>
            <MicEmpty color={styleGuide.red} />
          </div>
        </div>
      </button>
    </div>
  );
}

export default RecordSelect;
