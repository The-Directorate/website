import { basePath } from "../../App";
import logo from "../../assets/logo.svg";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
	<>
		<div className={styles.scrollingSpacer}></div>

		<header className={styles.topbar}>
			<a href="/" className={styles.logoContainer}>
				<img src={logo} alt="Logo" className={styles.logoImage} />
				<div className={styles.titleContainer}>
					<h1 className={styles.title}>The Directorate</h1>
					<h2 className={styles.tagLine}>Fear is hesitation, hesitation is defeat.</h2>
				</div>
			</a>

			<div className={styles.navBar}>
				<a href={basePath+"/directors"} className={styles.navLink}>
					<p>Directors</p>
				</a>
			</div>
		</header>
	</>

  )
}