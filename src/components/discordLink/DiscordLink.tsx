import discordLogo from "../../assets/discord.svg";
import styles from './DiscordLink.module.scss';

export const DiscordLink = () => {
  return (
	<a
	  href="https://discord.gg/NyV5ashEJQ"
	  target="_blank"
	  rel="noopener noreferrer"
	  className={styles.discordLink}
	  aria-label="Discord Link"
	>
	  <img
	  	className={styles.discordLogo}
		src={discordLogo}
		alt="Discord"
	  />
	</a>
  );
}
