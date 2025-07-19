import { useEffect, useRef } from 'react';

import blockHead from '../../assets/block.svg';
import eyeHead from '../../assets/eye.svg';
import styles from './Directors.module.scss';

export const Directors = () => {
	const eyeRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const { innerWidth, innerHeight } = window;

			const x = (e.clientX / innerWidth) * 2 - 1;
			const y = (e.clientY / innerHeight) * 2 - 1;

			const range = 50;

			if (eyeRef.current) {
				eyeRef.current.style.transform = `translate(${x * range}%, ${y * range}%)`;
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => {
		window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<main>
			<section className={styles.directors}>
				<h1 className={styles.title}>The Board of Directors</h1>
				<p className={styles.intro}>
					Join the ranks of Directors, the most ambitious and mischievous faction in Ish State's Season 2.7. We are the "bad guys" of the event, known for our distinctive style and bold identity.
				</p>
				<p className={styles.intro}>
					Recognise us by our iconic black suit and tie, and join us in our quest for dominance.
				</p>
			</section>

			
			<section className={styles.directorImages}>
				<div className={styles.smallDirectorImage}>
					<div>
						<h3>Director Cyn</h3>
						<p>Chief Marketing Officer</p>
					</div>
					<img
						className={styles.directorImage}
						src={blockHead}
						alt="A siluette of a person with a minecraft block for a head."
					/>
				</div>

				<div className={styles.mediumDirectorImage}>
					<div>
						<h2>Director Christie</h2>
						<p>Chief Strategy Officer</p>
					</div>
					<img
							className={styles.directorImage}
							src={blockHead}
							alt="A siluette of a person with a minecraft block for a head."
						/>
				</div>

				<div className={styles.largeDirectorImage}>
					<div>
						<h1>Director 7</h1>
						<p>Chief Executive Officer</p>
					</div>
					<img
						className={styles.directorImage}
						src={eyeHead}
						alt="A siluette of a person with an eye for a head."
					/>
					<div ref={eyeRef} className={styles.parallaxEye}></div>
				</div>

				<div className={styles.mediumDirectorImage}>
					<div>
						<h2>Director 13</h2>
						<p>Chief Operations Officer</p>
					</div>
					<img
						className={styles.directorImage}
						src={blockHead}
						alt="A siluette of a person with a minecraft block for a head."
					/>
				</div>

				<div className={styles.smallDirectorImage}>
					<div>
						<h3>Director Sammie</h3>
						<p>Chief Financial Officer</p>
					</div>
					<img
						className={styles.directorImage}
						src={blockHead}
						alt="A siluette of a person with a minecraft block for a head."
					/>
				</div>
			</section>
		</main>
	)
}

