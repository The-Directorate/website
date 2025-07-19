import { CallsToAction } from "../callsToAction/CallsToAction";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
	<>
		<header className={styles.footer}>
			<p>Join today!</p>
			<CallsToAction />
		</header>
	</>

  )
}