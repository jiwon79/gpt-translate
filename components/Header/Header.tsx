import { useRecoilValue } from "recoil";

import BackIcon from "@/components/Svg/BackIcon";
import { headerAtom } from "@/lib/recoil";

import styles from "./Header.module.scss"
import { useRouter } from "next/navigation";

const Header = () => {
  const header = useRecoilValue(headerAtom);
  const router = useRouter();

  const action = () => {
    if (header.prevHref) {
      router.push(header.prevHref);
    } else {
      router.back();
    }
  }

  return (
    <header className={styles.header}>
      <button className={styles.button} onClick={() => action()}>
        <BackIcon color={"#2e2e2e"} className={styles.icon__back} />
        <p className={styles.label}>{header.label}</p>
      </button>
    </header>
  )
}

export default Header;
