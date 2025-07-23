import { useState, createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import Board from './components/Game'; 
import './App.css'

export default function App() {
  const [mainUserMarker, setMainUserMarker] = useState<string>('O');
  const [gameMode, setGameMode] = useState<string>('');
  return (
    <main className='w-screen min-h-screen bg-dark-navy flex flex-row justify-center'>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <MainMenu 
                selectMarker={(marker:string) => setMainUserMarker(marker)} 
                selectGameMode={(mode:string) => setGameMode(mode)}
              />
            } 
          />
          <Route 
            path="game" 
            element={
              <Board 
                mainUserMarker={mainUserMarker}
                gameMode={gameMode}
              />
            } 
          />
        </Routes>
      </BrowserRouter>
    </main>
  )
}
