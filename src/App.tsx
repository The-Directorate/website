import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Directors } from './pages/directors/Directors';
import { Footer } from './widgets/footer/Footer'
import { Header } from './widgets/header/Header';
import { Homepage } from './pages/homepage/Homepage'

export const basePath = '/directorate-website'

function App() {
  return (
    <>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path={`${basePath}`} element={<Homepage />} />
          <Route path={`${basePath}/directors`} element={<Directors />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  )
}

export default App
