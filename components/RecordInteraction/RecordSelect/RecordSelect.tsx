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
      <button onClick={() => handleRecording(Language.EN)}>
        <div>
          <p>English</p>
          <MicEmpty color={styleGuide.blue} />
        </div>
      </button>
      <p>말하려면 누르세요.</p>
      <button onClick={() => handleRecording(Language.KO)}>
        <div>
          <p>한국어</p>
          <MicEmpty color={styleGuide.red} />
        </div>
      </button>
    </div>
  );
}

export default RecordSelect;
