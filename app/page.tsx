import TextInput from "@/components/textInput/TextInput";
import ToggleInput from "@/components/toggleInput/ToggleInput";
import styles from './page.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <p>어떤 상황이신가요?</p>
      <TextInput label={"장소"} placeholder={'대화가 진행되는 장소를 입력해 주세요.'} />
      <TextInput label={"상황"} placeholder={'대화 상황을 간단히 설명해 주세요.'} />
      <ToggleInput label={"높임말"}/>
      <div className={styles.spacer} />
      <button className={styles.button__start}>시작하기</button>
    </div>
  )
}

export default Home;
