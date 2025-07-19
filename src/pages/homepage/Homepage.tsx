import armWithBlock from '../../assets/arm_with_block.png';
import styles from './Homepage.module.scss';

export const Homepage = () => {


	return (
		<>			
			<main>
				<section className={styles.homepage}>
					<img
						className={styles.armImage}
						src={armWithBlock}
						alt="Arm holding a minecraft block high"
						style={{ filter: 'brightness(0) saturate(100%) invert(13%) sepia(8%) saturate(1107%) hue-rotate(176deg) brightness(97%) contrast(89%)' }}
					/>
					
					<section className={styles.infoSection}>
						<h1 className={styles.joinTitle}>Welcome to the Directorate</h1>
						<p className={styles.intro}>
							Join our clone-themed company for Ish State's Season 2.7, where Directors unite as the event's most ambitious, mischievous faction.
						</p>
						<div className={styles.features}>
							<p><b>Villain Vibes:</b> We're outwardly "bad guys", no peacekeeping, no neutral stance, we're here for bold, suspicious, and ambitious play.</p>
							<p><b>Distinctive Style:</b> Recognise our members by their iconic black suit and tie.</p>
							<p><b>Bold Identity:</b> Join the ranks of Directors (like Director9, Director10, Director17).</p>
							<p><b>Not Just Clones:</b> You don't have to change your username, we support all who wear the skin.</p>
							<p><b>Ready to join?</b> DM a Board Member on Discord for your skin and an invite!</p>
						</div>
					</section>
				</section>
			</main>
		</>
	)
}

