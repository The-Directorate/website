import { CallsToAction } from "../../components/callsToAction/CallsToAction";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
	<>
		<div className={styles.scrollingSpacer}></div>
		<header className={styles.footer}>
			<p>Join today!</p>
			<CallsToAction />
		</header>
	</>

  )
}