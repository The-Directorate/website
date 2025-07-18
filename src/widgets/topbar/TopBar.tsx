import { CallsToAction } from "../callsToAction/CallsToAction";
import logo from "../../assets/logo.svg";
import styles from "./TopBar.module.scss";

export const TopBar = () => {
  return (
	<>
		<div className={styles.scrollingSpacer}></div>

		<header className={styles.topbar}>
			<img src={logo} alt="Logo" className={styles.logoImage} />
			<div className={styles.titleContainer}>
				<h1 className={styles.title}>THE DIRECTORATE</h1>
				<p className={styles.tagLine}>FEAR IS HESITATION, HESITATION IS DEFEAT.</p>
			</div>
			<CallsToAction />
		</header>
	</>

  )
}