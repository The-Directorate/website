import { TopBar } from '../../widgets/topbar/TopBar';
import armWithBlock from '../../assets/arm_with_block.png';
import styles from './Homepage.module.scss';

export const Homepage = () => {


	return (
		<>
		<TopBar />
		
		<section className={styles.homepage}>
			<img
				className={styles.armImage}
				src={armWithBlock}
				alt="Arm holding a minecraft block high"
				style={{ filter: 'brightness(0) saturate(100%) invert(13%) sepia(8%) saturate(1107%) hue-rotate(176deg) brightness(97%) contrast(89%)' }}
			/>
			<div className={styles.joinContainer}>
				<h1 className={styles.joinTitle}>
					Join the Directorate Today!
				</h1>
				<p className={styles.joinText}>
					Some sample text inviting you to join the directorate.
				</p>
			</div>
		</section>

		</>
	)
}

