import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import styles from "./Header.module.scss";

export const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const [slogan, setSlogan] = useState<{ slogan: string, director: string } | undefined>();

	useEffect(() => {
		fetch("https://the-directorate.com:3000/slogan")
			.then((res) => res.json())
			.then((data) => setSlogan({"slogan": data.slogan, "director": data.director}))
			.catch(() => {});
	}, []);

	return (
		<>
			<div className={styles.scrollingSpacer}></div>

			<header className={styles.topbar}>
				<Link to={"/"} className={styles.logoContainer}>
					<img src={logo} alt="Logo" className={styles.logoImage} />
					<div className={styles.titleContainer}>
						<h2 className={styles.title}>The Directorate</h2>
						<h3 className={styles.slogan}>{slogan ? ("\"" + slogan.slogan + "\" - " + slogan.director) : <>&nbsp;</>}</h3>
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