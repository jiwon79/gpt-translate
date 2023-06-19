import styles from './AlternativeWrap.module.scss';
import AlternativeTranslate from "@/lib/model/AlternativeTranslate";
import BubbleSmall from "@/components/Svg/BubbleSmall";
import styleGuide from "@/styles/styleGuide.module.scss";
import useDialog from "@/lib/hooks/useDialog";
import { useRouter } from "next/navigation";

interface AlternativeWrapProps {
  alternativeTranslates: AlternativeTranslate[];
  setIsLoading: (isLoading: boolean) => void;
}

const AlternativeWrap = ({alternativeTranslates, setIsLoading}: AlternativeWrapProps) => {
  const router = useRouter();
  const { acceptTranslateFeedback } = useDialog();

  const onTapButton = async (alternativeTranslate: AlternativeTranslate) => {
    setIsLoading(true);
    await acceptTranslateFeedback(alternativeTranslate.translateText, alternativeTranslate.reTranslateText);
    setIsLoading(false);
    router.back();
  }

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
          <button
            key={index}
            className={styles.alternative}
            onClick={() => onTapButton(alternativeTranslate)}
          >
            <div className={styles.bubble}>
              <p className={styles.text__translate}>{translateText}</p>
              <p className={styles.text__reTranslate}>{reTranslateText}</p>
            </div>
            <BubbleSmall color={styleGuide.grey300} classname={`${styles.bubble__tail} ${tailStyle}`}/>
          </button>
        )
      })}
    </div>
  );
}

export default AlternativeWrap;
