import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Board } from './pages/board/Board';
import { Directors } from './pages/directors/Directors';
import { Footer } from './widgets/footer/Footer'
import { Header } from './widgets/header/Header';
import { Homepage } from './pages/homepage/Homepage'
import { NotFound } from './pages/notFound/NotFound';
import { SuitGenerator } from './pages/suitGenerator/SuitGenerator';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/board" element={<Board />} />
          <Route path="/directors" element={<Directors />} />

          <Route path="/suit_generator" element={<SuitGenerator />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
