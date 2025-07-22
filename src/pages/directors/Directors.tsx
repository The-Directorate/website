import type { Director } from "../../types";
import { DirectorCard } from "../../widgets/directorCard/DirectorCard";
import styles from "./Directors.module.scss";

export const Directors = () => {
	const exampleDirectors: Director[] = [
		{
			id: '1',
			name: 'Director One',
			role: 'Role One',
			image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d',
		},
		{
			id: '2',
			name: 'Director Two',
			role: 'Role Two',
			image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d',
			deathDay: 5,
		},
		{
			id: '3',
			name: 'Director Three',
			role: 'Role Three',
			image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d',
		}
	];


	return (
		<>
			<main>
				<h1>Directors</h1>

				<section className={styles.directorList}>
					{exampleDirectors.map(director => (
						<DirectorCard key={director.id} director={director} />
					))}
					<DirectorCard />
				</section>
			</main>
		</>
	)
}
