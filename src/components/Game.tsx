import { useContext, useEffect, useState } from "react";
import Button from "./Button"
import { createPortal } from "react-dom";
import  ModalWindow from './ModalWindow'
import { useNavigate } from 'react-router-dom';
import type {gameDataType, gameResultType} from './types'
import {clearCache, getCachedGameData, cacheGameData, cacheStepNumber, cacheHistorySteps} from './cache' 
import playWithCPU from "./minMax";
import { LanguageContext } from "../App";


export default function Board({mainUserMarker, gameMode}: {mainUserMarker:string, gameMode:string}){
    let gameData:gameDataType|null = getCachedGameData();
    if(!gameData) gameData = cacheGameData(mainUserMarker, gameMode);

    mainUserMarker = gameData.mainUserMarker;
    gameMode = gameData.gameMode;
    const navigate = useNavigate();
    const [stepNumber, setStepNumber]                       = useState<number>(gameData.stepNumber);
    const [resultGame, setResultGame]                       = useState<gameResultType | null>(null)
    const [historySteps, setHistorySteps]                   = useState<Array<string | null>>(gameData.historyOfSteps);
    const [isVisibleReturnModal,  setIsVisibleReturnModal]  = useState<boolean>(false);
    const [isVisibleRestartModal, setIsVisibleRestartModal] = useState<boolean>(false);
    const isXTurn = stepNumber % 2 == 0;

    const handleReturn = () => {
        clearCache();
        navigate('/', { replace: false })
    }
    const handleRestart = () => {
        cacheStepNumber(0);
        cacheHistorySteps(Array(9).fill(null)) 
        setStepNumber(0);
        setHistorySteps(Array(9).fill(null));
        setIsVisibleRestartModal(false);
    }
    const handleNextRound = () => {
        cacheStepNumber(0);
        cacheHistorySteps(Array(9).fill(null)) 
        setStepNumber(0);
        setHistorySteps(Array(9).fill(null));
        let gameData = getCachedGameData();
        if(gameData){
            if(resultGame && resultGame.isTied){
                let tiedScore = gameData.tied + 1;
                sessionStorage.setItem('gameData', JSON.stringify({...gameData, tied: tiedScore}))
            }
            else if(resultGame && !resultGame.isTied){
                let key = resultGame.winnerMark === 'X' ? 'xMarkerWin' : 'oMarkerWin';
                let score:number = (gameData[key as keyof gameDataType] as number) + 1;
                sessionStorage.setItem('gameData', JSON.stringify({...gameData, [key]: score}))
            }
        }
        setResultGame(null);
    }
    const handleMove = (cellInd:number) => {
        setStepNumber(stepNumber => stepNumber+1);
        historySteps[cellInd] = (isXTurn) ? 'X' : 'O';
        setHistorySteps(historySteps)
        cacheStepNumber(stepNumber+1);
        cacheHistorySteps(historySteps)
        let winnerMarker = calculateWinner(historySteps),
            isTied = historySteps.filter((el) => el === null).length === 0;

        if(winnerMarker || isTied){
            let result:gameResultType = winnerMarker ? {isTied: false, winnerMark: winnerMarker} : {isTied: true, winnerMark: ''}
            sessionStorage.removeItem('historyOfSteps');
            setResultGame(result)
        }
    }


    if(gameMode === 'solo' && (!isXTurn && mainUserMarker === 'X' || isXTurn && mainUserMarker === 'O')){
        playWithCPU(mainUserMarker, historySteps, handleMove);
    }

    return(
        <article className="w-custom self-start relative top-custom flex flex-col sm:gap-y-[64px] md:gap-y-[20px]">
            <Header 
                isXTurn={isXTurn} 
                onClickReturn= {() => setIsVisibleReturnModal(true)}
                onClickRestart={() => setIsVisibleRestartModal(true)}
            />
            <main className="grid gap-y-[20px]">
                <PlayingField 
                    isXTurn={isXTurn}
                    getCachedMarker={(cellInd:number) => historySteps[cellInd]}
                    handleMove={(cellInd:number) => handleMove(cellInd)}
                />
                <Score gameData={gameData}/>
            </main>

            { isVisibleReturnModal && createPortal( 
                <ModalWindow 
                    type='return' 
                    onClickSilverBtn={()=>setIsVisibleReturnModal(false)} 
                    onClickYellowBtn={handleReturn}
                />, document.body 
            )}
            { isVisibleRestartModal && createPortal( 
                <ModalWindow 
                    type='restart' 
                    onClickSilverBtn={()=>setIsVisibleRestartModal(false)} 
                    onClickYellowBtn={handleRestart}
                />, document.body 
            )}
            { resultGame && resultGame.isTied && createPortal( 
                <ModalWindow 
                    type='tied'
                    onClickSilverBtn={handleReturn} 
                    onClickYellowBtn={handleNextRound}
                />, document.body 
                )
            }
            { resultGame && !resultGame.isTied && createPortal( 
                <ModalWindow 
                    type='end game'
                    winnerMark={resultGame?.winnerMark}
                    gameMode={gameMode}
                    isMainUserWin={resultGame?.winnerMark === mainUserMarker}
                    onClickSilverBtn={handleReturn} 
                    onClickYellowBtn={handleNextRound}
                />, document.body 
                )
            }
        </article>
    )
}

function Header({isXTurn, onClickReturn, onClickRestart}: {isXTurn:boolean, onClickReturn: ()=>void, onClickRestart:()=>void}){
    const language = useContext(LanguageContext);
    const iconTurnStyle = 'sm:w-[16px] sm:h-[16px] md:w-[20px] md:h-[20px]'
    return(
        <header className="w-full sm:h-[40px] md:h-[52px] grid grid-cols-3 grid-rows-1 gap-[20px] justify-between items-center">
            <button className="cursor-pointer justify-self-start" onClick={onClickReturn}><img src="logo.svg" alt="logo" /></button>
            <div className="flex flex-row justify-center items-center sm:gap-x-[9px] md:gap-x-[13px] bg-semi-dark-navy inset-shadow-sm inset-shadow-navy-shadow rounded-[5px] px-[15px] py-[8px] h-full text-heading-xs text-silver">
                {language === 'ru' && 'ХОДИТ'}
                { isXTurn ? <img className={iconTurnStyle} src="icon-x-light.svg" /> : <img className={iconTurnStyle} src="icon-o-light.svg" alt="" /> }
                {language === 'en' && 'TURN'}
            </div>
            <Button name="restart" handleClick={onClickRestart}>
                <img className="w-[16px] h-[16px]" src="icon-restart.svg" alt="restart button"/>
            </Button>
        </header>
    )
}

function Score({gameData}: {gameData:gameDataType}){
    const language = useContext(LanguageContext);
    const text = {
        en: {
            1: 'YOU',
            2: 'CPU',
            3: 'TIES',
            4: 'P1',
            5: 'P2',
        },
        ru: {
            1: 'ВЫ',
            2: 'ИИ',
            3: 'НИЧЬЯ',
            4: 'И1',
            5: 'И2',
        }
    }
    let xOwner:string, oOwner:string;
    if(gameData.mainUserMarker === 'X'){
        xOwner = (gameData.gameMode === 'solo') ? text[language as keyof typeof text][1] : text[language as keyof typeof text][4];
        oOwner = (gameData.gameMode === 'solo') ? text[language as keyof typeof text][2] : text[language as keyof typeof text][5];
    }
    else{
        oOwner = (gameData.gameMode === 'solo') ? text[language as keyof typeof text][1] : text[language as keyof typeof text][4];
        xOwner = (gameData.gameMode === 'solo') ? text[language as keyof typeof text][2] : text[language as keyof typeof text][5];
    }
    const scoreStyle:string = ' w-full rounded-[10px] text-body text-dark-navy text-center py-[12px] ';
    return(
        <section className="w-full flex flex-row gap-x-[20px]">
            <div className={"bg-blue  " + scoreStyle}  >
                X({xOwner})
                <p className="text-heading-s">{gameData.xMarkerWin}</p>
            </div>
            <div className={"bg-silver" + scoreStyle}>
                {text[language as keyof typeof text][3]}
                <p className="text-heading-s">{gameData.tied}</p>
            </div>
            <div className={"bg-yellow" + scoreStyle}>
                O({oOwner})
                <p className="text-heading-s">{gameData.oMarkerWin}</p>
            </div>
        </section>
    )
}

function PlayingField(props: {isXTurn:boolean, getCachedMarker: (cellInd:number)=>string|null, handleMove: (cellInd:number)=>void}){
    const indexes = [0,1,2,3,4,5,6,7,8];
    return(
        <section className="w-full grid grid-cols-3 grid-rows-3 gap-[20px] justify-items-center items-center">
            {
                indexes.map((elInd:number, keyInd: number) => {
                    return (
                        <Cell 
                            key={keyInd}
                            isXTurn={props.isXTurn}  
                            handleMove={() => props.handleMove(elInd)}
                            marker={props.getCachedMarker(elInd)}     
                    />)
                })
            }
        </section>
    )
}

function Cell({isXTurn, marker, handleMove}: {isXTurn:boolean, marker: string | null, handleMove: () => void}){
    const [currStepMarker, setCurrStepMarker] = useState<string | null>(marker);
    useEffect(() => setCurrStepMarker(marker), [marker])
    const hoverImg = (isXTurn) ? ' hover:bg-[url(icon-x-outline.svg)] ' : ' hover:bg-[url(icon-o-outline.svg)] '
    const getImgMarker = (marker: string): string => {
        return marker === 'X' ? 'icon-x.svg' : 'icon-o.svg';
    }
    const handleClick = () => {
        if(!currStepMarker){
            setCurrStepMarker(isXTurn ? 'X' : 'O');
            handleMove()
        }
    }
    return(
        <button 
            className = {
                (!currStepMarker && hoverImg + ' cursor-pointer ') + 
                " hover:bg-center hover:bg-no-repeat cellSize relative flex flex-col justify-center items-center bg-semi-dark-navy inset-shadow-md inset-shadow-navy-shadow rounded-[10px]"}
            onClick={handleClick}
        >
            { currStepMarker && <img className="pos sm:w-[40px] sm:h-[40px] md:h-[64px] md:w-[64px]" src={getImgMarker(currStepMarker)} alt="your turn marker" /> }
        </button>
    )
}




export function calculateWinner(steps:Array<string | null>): string | null{
    const winnerCombo:number[][] = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    for(let i=0; i<winnerCombo.length; i++){
        const [a,b,c] = winnerCombo[i];
        if(steps[a] && steps[a] === steps[b] && steps[a] === steps[c]){ 
            return steps[a];
        }
    }
    return null;
}