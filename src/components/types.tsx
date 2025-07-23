export type gameDataType = {
    gameMode:       string,
    mainUserMarker: string,
    historyOfSteps: Array<string|null>,
    stepNumber:     number,
    xMarkerWin:     number,
    oMarkerWin:     number,
    tied:           number,
}
export type gameResultType = {
    isTied: boolean,
    winnerMark: string
}

export type modalWindowType = {
    type:string, 
    winnerMark?:string, 
    gameMode?:string, 
    isMainUserWin?:boolean,
    onClickSilverBtn: () => void,
    onClickYellowBtn: () => void,
}