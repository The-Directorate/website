import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import styles from "./Header.module.scss";

const apiBase = import.meta.env.VITE_API_URL;

export const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const [slogan, setSlogan] = useState<{ slogan: string, director: string } | undefined>();

	useEffect(() => {
		let intervalId: ReturnType<typeof setInterval>;

		const fetchSlogan = () => {
			fetch(`${apiBase}/slogan`)
				.then((res) => res.json())
				.then((data) => setSlogan({ slogan: data.slogan, director: data.director }))
				.catch(() => {});
		};

		fetchSlogan();
		intervalId = setInterval(fetchSlogan, 10000);

		return () => clearInterval(intervalId);
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
						<Link to={"/"} className={styles.navLink}>Home</Link>
						<Link to={"/board"} className={styles.navLink}>The Board</Link>
						{/* <Link to={"/directors"} className={styles.navLink}>Directors</Link> */}
						<Link to={"/suit_generator"} className={styles.navLink}>Suit Generator</Link>
					</div>
				</nav>
			</header>
		</>
	)
}