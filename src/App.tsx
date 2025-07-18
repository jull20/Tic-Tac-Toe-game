import { useState, createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import Game from './components/Game'; 
import './App.css'

const GameModeContext = createContext<string | null>(null);

export default function App() {
  const [mainUserMarker, setMainUserMarker] = useState<string>('X');
  const [gameMode, setGameMode] = useState<string>('');
  return (
    <main className='w-screen min-h-screen bg-dark-navy flex flex-column justify-center items-center'>
      <BrowserRouter>
        <Routes>
          <Route 
            path="*" 
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
              <GameModeContext value={gameMode}>
                <Game 
                  mainUserMarker={mainUserMarker}
                />
              </GameModeContext>
            } 
          />
        </Routes>
      </BrowserRouter>
    </main>
  )
}
