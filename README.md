# Directorate Website
A React + Vite site for "The Directorate," a company in the Ish State Minecraft event (season 2.7: The Purge).
This project uses TypeScript, SCSS modules, and is set up for deployment to GitHub Pages.

## 🚀 Quick Start
### 1. Download / Clone the Repository
```bash
git clone https://github.com/The-Directorate/website
cd website
```
### 2. Install Dependencies
Make sure you have Node.js ≥ 20.12.0 installed.
Then run:
```bash
npm install
```
### 3. Run Locally
Start the dev server with:
```bash
npm run dev
```
Visit http://localhost:5173/website/ in your browser.
All code changes will hot-reload automatically.

## ✍️ Adding Pages, Components, or Styles
### Create a new page:
Add a .tsx file in src/pages/ and register it as a <Route /> in App.tsx.

### Add a new component:
Place your component in src/components/ or a relevant folder.
Import and use in any page as needed.

### Style with SCSS modules:
Create a .module.scss file in the same folder as your component.
Import styles in your component:

```tsx
import styles from './YourComponent.module.scss';
```

### Apply classes:
```
<div className={styles.someClass}>...</div>
```

### Add an asset (image, etc.):
Place in src/assets/ and import for use in your components.

## 💡 Project Notes
Uses React Router's HashRouter so routing works on GitHub Pages.

All navigation should use `<Link to="...">` from react-router-dom, not plain `<a href="...">`.

## 📂 Directory Structure (Key Folders)
text
/src
  /assets         # Images & graphics
  /components     # Reusable components
  /pages          # App pages (Homepage, Board, Directors, etc.)
  /widgets        # Common layout (Header, Footer, and anything that needs to call an API)

## 🛠️ Requirements
- Node.js 20.12.0 or newer
- npm 9+
- GitHub account (for commiting / forking)

## 🤝 Contributing
1. Fork the repository and clone your fork
2. Create your feature branch: git checkout -b feature/your-change
3. Make changes and commit: git commit -am 'Add your feature'
4. Push to the branch: git push origin feature/your-change
5. Open a Pull Request
