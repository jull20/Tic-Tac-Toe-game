import type {gameDataType} from './types'

export function clearCache(){
    sessionStorage.removeItem('gameData');
}

export function getCachedGameData(): gameDataType|null{
    const gameData:string|null = sessionStorage.getItem('gameData');
    if(gameData){
        return JSON.parse(gameData);
    }
    return null;
}
export function cacheGameData(mainUserMarker:string, gameMode:string){
    const gameData: gameDataType = {
        gameMode:       gameMode,
        mainUserMarker: mainUserMarker,
        historyOfSteps: Array(9).fill(null),
        stepNumber:     0,
        xMarkerWin:     0,
        oMarkerWin:     0,
        tied:           0,
    }
    sessionStorage.setItem('gameData', JSON.stringify(gameData));
    return gameData;
}

export function cacheStepNumber(stepNumber:number){
    let gameData = getCachedGameData();
    if(gameData){
        sessionStorage.setItem('gameData', JSON.stringify({...gameData, stepNumber: stepNumber}));
    }
}
export function cacheHistorySteps(historySteps:Array<string|null>){
    let gameData = getCachedGameData();
    if(gameData){
        sessionStorage.setItem('gameData', JSON.stringify({...gameData, historyOfSteps: historySteps}));
    }
}