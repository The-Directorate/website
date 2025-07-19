import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Homepage } from './pages/homepage/Homepage'
import { TopBar } from './widgets/topbar/TopBar';

const basePath = '/directorate-website'

function App() {
  return (
    <>
      <TopBar />

      <BrowserRouter>
        <Routes>
          <Route path={`${basePath}`} element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
