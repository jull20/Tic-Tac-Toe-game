import { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import Board from './components/Game'; 
import './App.css'

export const LanguageContext = createContext<string>('en')

function getLenguage(): string{
  const data:string|null = sessionStorage.getItem('language');
  return data ?? 'en';
}

export default function App() {
  const [mainUserMarker, setMainUserMarker] = useState<string>('O');
  const [gameMode, setGameMode] = useState<string>('');
  const [language, setLanguage] = useState<string>(getLenguage());

  const handleLenguage = (l: string) => {
    setLanguage(l);
    sessionStorage.setItem('language', l);
  }
  return (
    <LanguageContext value={language}>
      <main className={'w-screen min-h-screen bg-dark-navy flex flex-row justify-center ' + (language === 'en' ? 'lang-en' : 'lang-ru')} >
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <MainMenu 
                  selectMarker={(marker:string) => setMainUserMarker(marker)} 
                  selectGameMode={(mode:string) => setGameMode(mode)}
                  selectLenguage={(l:string) => handleLenguage(l)}
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
    </LanguageContext>
  )
}
