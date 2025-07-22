import discordLogo from "../../assets/discord.svg";
import styles from './DiscordLink.module.scss';

export const DiscordLink = () => {
  return (
	<a
	  href="https://discord.gg/Gt3UmecT"
	  target="_blank"
	  rel="noopener noreferrer"
	  className={styles.discordLink}
	  aria-label="Join our Discord"
	>
	  <img
	  	className={styles.discordLogo}
		src={discordLogo}
		alt="Discord"
	  />
	</a>
  );
}
