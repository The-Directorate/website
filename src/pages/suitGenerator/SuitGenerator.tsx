import React, { useCallback, useRef, useState } from "react";

import Skinview3d from "react-skinview3d";
import styles from './SuitGenerator.module.scss';
import suitTemplate from '../../assets/suit_template.png';

function getUsernameSkinUrl(username: string) {
	return `https://mineskin.eu/skin/${encodeURIComponent(username)}.png`;
}


const CANVAS_SIZE = 64; // Classic Minecraft skin size

export const SuitGenerator = () => {
	const [skinImg, setSkinImg] = useState<HTMLImageElement | null>(null);
	const [suitImg, setSuitImg] = useState<HTMLImageElement | null>(null);
	const [processing, setProcessing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const fileInputRef = useRef<HTMLInputElement>(null);
	const usernameInputRef = useRef<HTMLInputElement>(null);

	// Load suit image at mount

	React.useEffect(() => {
		const img = new window.Image();
		img.crossOrigin = "anonymous";
		img.src = suitTemplate;
		img.onload = () => setSuitImg(img);
	}, []);

	const handleSkinFile = async (file: File) => {
		setProcessing(true);
		setError(null);
		try {
			const reader = new FileReader();
			reader.onload = () => {
				const base64 = reader.result as string;
				const img = new window.Image();
				img.crossOrigin = "anonymous";
				img.src = base64;
				img.onload = () => setSkinImg(img);
			};
			reader.readAsDataURL(file);
		} catch (err: any) {
			setError("Could not load skin PNG");
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		if (e.dataTransfer.files.length > 0) {
			handleSkinFile(e.dataTransfer.files[0]);
		}
	};
	const handleSkinSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null;
		if (file) handleSkinFile(file);
	};

	const handleFetchByUsername = async () => {
		const username = usernameInputRef.current?.value.trim();
		if (!username) {
			setError("Please enter a username.");
			return;
		}
		setProcessing(true);
		setError(null);
		try {
			const skin = new window.Image();
			skin.crossOrigin = "anonymous";
			skin.src = getUsernameSkinUrl(username);
			skin.onload = () => setSkinImg(skin);
			skin.onerror = () =>
				setError(
					"Could not fetch Minecraft skin. Maybe the username is invalid."
				);
		} catch {
			setError("Error loading skin image.");
		}
	}

	const isSlimSkin = (skin: HTMLImageElement): boolean => {
		// Create a no-display canvas to check transparency of key pixel for slim model
		const c = document.createElement("canvas");
		c.width = skin.width;
		c.height = skin.height;
		const ctx = c.getContext("2d")!;
		ctx.drawImage(skin, 0, 0);
		// Key pixel for slim model: (54, 20) must be transparent (alpha = 0)
		const { data } = ctx.getImageData(54, 20, 1, 1);
		return data[3] === 0;
	}

	const returnToInput = useCallback(() => {
		setSkinImg(null);
		setPreviewUrl(null);
		setProcessing(false);
		setError(null);
	}, []);


	// Compose the final image whenever both images are ready
	React.useEffect(() => {
		if (!skinImg || !suitImg) return;
		// Compose on hidden canvas
		const canvas = document.createElement("canvas");
		canvas.width = CANVAS_SIZE;
		canvas.height = CANVAS_SIZE;
		const ctx = canvas.getContext("2d")!;

		// 1. Draw base skin (without outer layers for all but head)
		// Minecraft skin layout: https://minecraft.fandom.com/wiki/Skin#Skin_files
		ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
		ctx.drawImage(skinImg, 0, 0, CANVAS_SIZE, CANVAS_SIZE);

		// 2. Remove all outer layers EXCEPT head overlay
		ctx.clearRect(0, 32, 64, 16); // Body overlay
		ctx.clearRect(0, 48, 16, 16);  // Left arm overlay
		ctx.clearRect(48, 48, 16, 16); // Left leg overlay

		// 4. Draw the suit template PNG on top (using transparent mode)
		ctx.drawImage(suitImg, 0, 0, CANVAS_SIZE, CANVAS_SIZE);

		if (isSlimSkin(skinImg)) {
			console.log("Slim skin detected");
			ctx.drawImage(skinImg, 47, 16, 1, 4, 47, 16, 1, 4); // Right arm shoulder
			ctx.drawImage(skinImg, 39, 48, 1, 4, 39, 48, 1, 4); // Left arm shoulder
		}

		// 5. Set URL for download/preview
		setPreviewUrl(canvas.toDataURL("image/png"));
		setProcessing(false);

		console.log("ready");
	}, [skinImg, suitImg]);

	return (
		<main className={styles.container}>
			<section className={styles.inputSection + " " + (previewUrl ? styles.hidden : "")}>
				<h1>Suit Up Your Minecraft Skin</h1>

				<div>
					<p>Enter your Minecraft username to fetch your skin:</p>
					<input
						ref={usernameInputRef}
						type="text"
						placeholder="Enter Minecraft username"
						className={styles.usernameInput}
					/>
					<button onClick={handleFetchByUsername} className={styles.fetchButton}>
						Get Skin
					</button>
				</div>

				<h2>Or</h2>

				<div
					className={styles.dropArea}
					onDragOver={e => e.preventDefault()}
					onDrop={handleDrop}
					onClick={() => fileInputRef.current?.click()}
					role="button"
					tabIndex={0}
				>
					<input
						ref={fileInputRef}
						type="file"
						accept="image/png"
						onChange={handleSkinSelect}
						className={styles.hiddenInput}
					/>
					<p>Drag here to upload your skin,<br/>or click to select PNG file</p>
				</div>
				
				{processing && <div>Processing...</div>}
				{error && (
					<div className={styles.error}>{error}</div>
				)}
			</section>

			{previewUrl && (
				<section className={styles.previewSection + " " + (previewUrl ? "" : styles.hidden)}>
					<p className={styles.backLink} onClick={returnToInput}>&lt; back</p>

					<Skinview3d
						skinUrl={previewUrl}
						width={300}
						height={400}
					/>

					<div>
						<a
							href={previewUrl}
							download="suited_skin.png"
							className={styles.downloadLink}
						>
							Download PNG
						</a>
					</div>
				</section>
			)}

		</main>
	);
}
