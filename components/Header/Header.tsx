import styles from "./Header.module.scss"
import Link from "next/link";

interface HeaderProps {
  prevLabel: string;
  prevHref: string;
  label: string;
}

const Header = ({prevLabel, prevHref, label}: HeaderProps) => {
  return (
    <header className={styles.header}>
      <Link href={prevHref} className={styles.label__prev}>
        <p>{prevLabel}</p>
      </Link>
      <p className={styles.label}>{label}</p>
    </header>
  )
}

export default Header;
