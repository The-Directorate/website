import { DiscordLink } from "../discordLink/DiscordLink"
import styles from "./CallsToAction.module.scss";

export const CallsToAction = () => {
	return (
		<div className={styles.callsToAction}>
			<DiscordLink />
		</div>
	)
}