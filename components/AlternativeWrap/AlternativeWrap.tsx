import styles from './AlternativeWrap.module.scss';
import AlternativeTranslate from "@/lib/model/AlternativeTranslate";
import BubbleSmall from "@/components/Svg/BubbleSmall";
import { toast } from "react-toastify";
import styleGuide from "@/styles/styleGuide.module.scss";

interface AlternativeWrapProps {
  alternativeTranslates: AlternativeTranslate[];
}

const AlternativeWrap = ({alternativeTranslates}: AlternativeWrapProps) => {
  console.log(alternativeTranslates);

  return (
    <div className={styles.alternative__wrap}>
      {alternativeTranslates.map((alternativeTranslate, index) => {
        const tailStyle = index === 0 ? styles.bubble__tail__right : styles.bubble__tail__left;
        const translateText = alternativeTranslate.translateText === ''
          ? 'loading...'
          : alternativeTranslate.translateText;
        const reTranslateText = alternativeTranslate.reTranslateText === ''
          ? 'loading...'
          : `(${alternativeTranslate.reTranslateText})`;

        return (
          <div key={index} className={styles.alternative}>
            <div className={styles.bubble}>
              <p className={styles.text__translate}>{translateText}</p>
              <p className={styles.text__reTranslate}>{reTranslateText}</p>
            </div>
            <BubbleSmall color={styleGuide.grey300} classname={`${styles.bubble__tail} ${tailStyle}`}/>
          </div>
        )
      })}
    </div>
  );
}

export default AlternativeWrap;
