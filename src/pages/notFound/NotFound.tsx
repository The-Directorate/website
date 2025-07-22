import { useEffect, useRef } from 'react';

import eyeHead from '../../assets/eye.svg';
import eyeNoPupilHeead from '../../assets/eye_no_pupil.svg';
import styles from './NotFound.module.scss';

export const NotFound = () => {
	const blackEyeRef = useRef<HTMLDivElement>(null);
	const redEyeRef = useRef<HTMLDivElement>(null);
	const orangeEyeRef = useRef<HTMLDivElement>(null);

	const redSilhouetteRef = useRef<HTMLDivElement>(null);
	const orangeSilhouetteRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const movementScalar = 0.66;
			const silhouetteScalar = -0.04;

			if (!blackEyeRef.current) return;

			const eyeRect = blackEyeRef.current.getBoundingClientRect();
			const eyeCenterX = eyeRect.left + eyeRect.width / 2;
			const eyeCenterY = eyeRect.top + eyeRect.height / 2;

			const x = ((e.clientX - eyeCenterX) / eyeRect.width);
			const y = ((e.clientY - eyeCenterY) / eyeRect.height);

			const range = 2;

			if (blackEyeRef.current) {
				blackEyeRef.current.style.transform = `translate(${x * range}%, ${y * range}%)`;
				redEyeRef.current!.style.transform = `translate(${x * range * movementScalar}%, ${y * range * movementScalar}%)`;
				orangeEyeRef.current!.style.transform = `translate(${x * range * movementScalar/2}%, ${y * range * movementScalar/2}%)`;

				redSilhouetteRef.current!.style.transform = `translate(${x * range * silhouetteScalar}%, ${y * range * silhouetteScalar}%)`;
				orangeSilhouetteRef.current!.style.transform = `translate(${x * range * silhouetteScalar/2}%, ${y * range * silhouetteScalar/2}%)`;
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => {
		window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<>
			<main>
				<section className={styles.notFoundMessage}>
					<h1 className={styles.title}>Page Not Found</h1>
					<p className={styles.intro}>
						The director kindly requests that you stop seeking answers to the questions you shouldn't ask.
					</p>
				</section>
			</main>

			<section className={styles.directorImages}>
				<div className={styles.largeDirectorImage}>
					<div className={styles.directorImage}>
						<div>
							<div ref={redSilhouetteRef}>
								<img
									className={styles.orangeDirector}
									src={eyeNoPupilHeead}
									alt="A siluette of a person with an eye for a head."
								/>
							</div>
							<div ref={orangeSilhouetteRef}>
								<img
									className={styles.redDirector}
									src={eyeNoPupilHeead}
									alt="A siluette of a person with an eye for a head."
								/>
							</div>
							<div>
								<img
									className={styles.blackDirector}
									src={eyeNoPupilHeead}
									alt="A siluette of a person with an eye for a head."
								/>
							</div>
						</div>

						<img
							src={eyeNoPupilHeead}
							alt="A siluette of a person with an eye for a head."
						/>
						
						<div>
							<div ref={orangeEyeRef} className={`${styles.parallaxEye} ${styles.orangeEye}`}></div>
							<div ref={redEyeRef} className={`${styles.parallaxEye} ${styles.redEye}`}></div>
							<div ref={blackEyeRef} className={styles.parallaxEye}></div>
						</div>
					</div>
				</div>
			</section>

			<section className={styles.phoneImage}>
				<img
					src={eyeHead}
					alt="A siluette of a person with an eye for a head."
				/>
			</section>

		</>
	)
}

