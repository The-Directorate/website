import styles from './Throbber.module.scss';

export const Throbber = () => {
	return (
		<div className={styles.throbber}>
			<div className={styles.spinner}></div>
		</div>
	);
}