import React, { useRef, useState } from "react";

import styles from './SuitGenerator.module.scss';

const SUIT_URL =
	"https://media.discordapp.net/attachments/479952466897534976/1398847013080141914/suit_template_4.png?ex=6886d94d&is=688587cd&hm=ee635ff932d2d1539c65013c3d1a608a9a310d7326319b8161e1af2b2facf85d&=&format=webp&quality=lossless&width=144&height=144";


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
		img.src = SUIT_URL;
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
		// Head base: (8,8)-(16,16), overlay: (40,8)-(48,16)
		// Body base: (20,20)-(28,32), overlay: (20,36)-(28,48)
		// Leg base:  (4,20)-(8,32),   overlay: (4,36)-(8,48)
		// Arm base:  (44,20)-(48,32), overlay: (44,36)-(48,48)
		// Draw the entire "inner" skin
		ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
		ctx.drawImage(skinImg, 0, 0, CANVAS_SIZE, CANVAS_SIZE);

		// 2. Remove all outer layers EXCEPT head overlay
		ctx.clearRect(0, 32, 64, 16); // Body overlay
		ctx.clearRect(0, 48, 16, 16);  // Left arm overlay
		ctx.clearRect(48, 48, 16, 16); // Left leg overlay

		// 4. Draw the suit template PNG on top (using transparent mode)
		ctx.drawImage(suitImg, 0, 0, CANVAS_SIZE, CANVAS_SIZE);

		if (isSlimSkin(skinImg)) {
			ctx.drawImage(skinImg, 47, 16, 1, 4, 47, 16, 1, 4); // Right arm shoulder 
			ctx.drawImage(skinImg, 39, 48, 1, 4, 39, 48, 1, 4); // Left arm shoulder 
		}

		// 5. Set URL for download/preview
		setPreviewUrl(canvas.toDataURL("image/png"));
		setProcessing(false);
	}, [skinImg, suitImg]);

	return (
		<main className={styles.container}>
			<section>
				<h1>Suit Up Your Minecraft Skin</h1>
				<p>
					Drag &amp; drop your Minecraft skin PNG, <br/>
					or enter your username to fetch it,<br/>
					and we'll layer on the suit!
				</p>

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
					<strong>Drag here to upload your skin,<br/>or click to select PNG file</strong>
				</div>

				<div>
					<input
						ref={usernameInputRef}
						type="text"
						placeholder="Or enter Minecraft username"
						className={styles.usernameInput}
					/>
					<button onClick={handleFetchByUsername} className={styles.fetchButton}>
						Get Skin
					</button>
				</div>
				{processing && <div>Processing...</div>}
				{error && (
					<div className={styles.error}>{error}</div>
				)}
			</section>

			<section>
				{previewUrl && (
					<div>
						<div>
							<img
								src={previewUrl}
								alt="Preview: suited skin"
								className={styles.previewImage}
							/>
						</div>
						<a
							href={previewUrl}
							download="suited_skin.png"
							className={styles.downloadLink}
						>
							Download PNG
						</a>
					</div>
				)}
			</section>
		</main>
	);
}
