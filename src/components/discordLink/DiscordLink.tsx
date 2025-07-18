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
		src="https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/discord.svg"
		alt="Discord"
	  />
	</a>
  );
}