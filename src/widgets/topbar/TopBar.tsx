import { DiscordLink } from "../../components/discordLink/DiscordLink";
import logo from "../../assets/logo.svg";
import styles from "./TopBar.module.scss";

export const TopBar = () => {
  return (
	<header className={styles.topbar}>
	  <img src={logo} alt="Logo" className={styles.logoImage} />
	  <h1 className={styles.title}>The Directorate</h1>
	  <DiscordLink />
	</header>
  )
}