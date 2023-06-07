import styles from './RecordButtonWrap.module.scss';

const RecordButtonWrap = () => {
  return (
    <div className={styles.button__wrap}>
      <button>영어</button>
      <p>말하려면 누르세요.</p>
      <button>한국어</button>
    </div>
  );
}

export default RecordButtonWrap;
