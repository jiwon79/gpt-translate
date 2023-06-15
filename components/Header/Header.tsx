import Link from "next/link";
import styles from "./Header.module.scss"
import BackIcon from "@/components/Svg/BackIcon";

interface HeaderProps {
  prevLabel: string;
  prevHref: string;
  label: string;
}

const Header = ({prevLabel, prevHref, label}: HeaderProps) => {
  return (
    <header className={styles.header}>
      <Link href={prevHref} className={styles.label__prev}>
        <BackIcon color={"#2e2e2e"} className={styles.icon__back} />
        <p>{prevLabel}</p>
      </Link>
      <p className={styles.label}>{label}</p>
    </header>
  )
}

export default Header;
