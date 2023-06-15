import Link from "next/link";
import { useRecoilValue } from "recoil";

import BackIcon from "@/components/Svg/BackIcon";
import { headerAtom } from "@/lib/recoil";

import styles from "./Header.module.scss"

const Header = () => {
  const header = useRecoilValue(headerAtom);

  return (
    <header className={styles.header}>
      <Link href={header.prevHref} className={styles.link}>
        <BackIcon color={"#2e2e2e"} className={styles.icon__back} />
        <p className={styles.label}>{header.label}</p>
      </Link>
    </header>
  )
}

export default Header;
