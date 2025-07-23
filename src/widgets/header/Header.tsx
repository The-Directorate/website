import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import styles from "./Header.module.scss";
import { useState } from "react";

export const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<>
			<div className={styles.scrollingSpacer}></div>

			<header className={styles.topbar}>
				<Link to={"/"} className={styles.logoContainer}>
					<img src={logo} alt="Logo" className={styles.logoImage} />
					<div className={styles.titleContainer}>
						<h2 className={styles.title}>The Directorate</h2>
						<h3 className={styles.tagLine}>Fear is hesitation, hesitation is defeat.</h3>
					</div>
				</Link>

				<nav className={styles.navBar}>
					<button
						className={styles.menuButton}
						onClick={() => setMenuOpen((prev) => !prev)}
						aria-label="Toggle menu"
					>
						&#9776;
					</button>
					
					<div className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
						<Link to={"/board"} className={styles.navLink}>The Board</Link>
						{/* <Link to={"/directors"} className={styles.navLink}>Directors</Link> */}
						<Link to={"/test"} className={styles.navLink}>Test</Link>
					</div>
					</nav>
			</header>
		</>

	)
}