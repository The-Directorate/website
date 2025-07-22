import './App.css'

import { HashRouter, Route, Routes } from 'react-router-dom'

import { Board } from './pages/board/Board';
import { Directors } from './pages/directors/Directors';
import { Footer } from './widgets/footer/Footer'
import { Header } from './widgets/header/Header';
import { Homepage } from './pages/homepage/Homepage'
import { NotFound } from './pages/notFound/NotFound';

export const basePath = '/directorate-website/#'

function App() {
  return (
    <>

      <HashRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/board" element={<Board />} />
          <Route path="/directors" element={<Directors />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />

      </HashRouter>

    </>
  )
}

export default App
