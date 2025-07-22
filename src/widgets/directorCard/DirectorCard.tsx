import type { Director } from '../../types';
import { Throbber } from '../../components/throbber/Throbber';
import styles from './DirectorCard.module.scss';

type DirectorCardProps = {
	director?: Director;
};

export const DirectorCard = ({ director }: DirectorCardProps) => {

	return (
		director ? (
			<div className={`${styles.directorCard} ${director.deathDay ? styles.deceased : ''}`}>
				<img src={director.image} alt={`${director.name}'s portrait`} className={styles.directorImage} />

				<h2 className={styles.directorName}>{director.name}</h2>
				<p className={styles.directorRole}>{director.role}</p>
				{director.deathDay && <span className={styles.deathDay}>Deceased: Day {director.deathDay}</span>}
			</div>
		) : (
			<div className={`${styles.directorCard} ${styles.loading}`}>
				<Throbber />
			</div>
		)
	);
}