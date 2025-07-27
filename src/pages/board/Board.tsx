import { useEffect, useRef } from 'react';

import blockHead from '../../assets/block.svg';
import eyeHead from '../../assets/eye.svg';
import eyeNoPupilHeead from '../../assets/eye_no_pupil.svg';
import styles from './Board.module.scss';

const LeaderImage = () => {
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
	)
}

type ColumnProps = {
	className: string,
	directors: Array<{
		name: string;
		position: string;
	}>
}

const BoardMemberColumn = ({ className, directors }: ColumnProps) => {
	return (
		<div className={className}>
			{directors.map((director) => (
				<div key={director.name}>
					<h2 className={styles.directorName}>{director.name}</h2>
					<p className={styles.directorPosition}>{director.position}</p>
				</div>
			))}

			{className === styles.largeDirectorImage ? <LeaderImage /> : (		
				<img
					className={styles.directorImage}
					src={blockHead}
					alt="A siluette of a person with a minecraft block for a head."
				/>
			)}
		</div>
	)
}

export const Board = () => {
	return (
		<>
			
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
					<BoardMemberColumn className={styles.smallDirectorImage} directors={[
						{ name: "Director Cyn", position: "Chief Marketing Officer" },
						{ name: "Director N", position: "Chief Intelligence Officer" },
						{ name: "Director 47", position: "Board Member" }
					]} />
					
					<BoardMemberColumn className={styles.mediumDirectorImage} directors={[
						{ name: "Director Christie", position: "Chief Strategy Officer" }
					]} />

					<BoardMemberColumn className={styles.largeDirectorImage} directors={[
						{ name: "Director 7", position: "Chief Executive Officer" }
					]} />

					<BoardMemberColumn className={styles.mediumDirectorImage} directors={[
						{ name: "Director 13", position: "Chief Operations Officer" }
					]} />

					<BoardMemberColumn className={styles.smallDirectorImage} directors={[
						{ name: "Director Sammie", position: "Chief Development Officer" },
						{ name: "Director 10", position: "Board Member" }
					]} />
				</section>
			</main>

			<section className={styles.phoneImage}>
				<img
					src={eyeHead}
					alt="A siluette of a person with an eye for a head."
				/>
			</section>

		</>
	)
}

