import {calculateWinner} from './Game'

export default function playWithCPU(mainUserMarker:string, board:Array<string|null>, handleMove: (ind:number)=>void){
    let index = minMax(board, mainUserMarker === 'X')[1];
    console.log(index)
    handleMove(index);
}

function minMax(inputBoard:Array<string|null>, isMaximizing:boolean): number[] {
    if(gameIsOver(inputBoard)) return [evaluateBoard(inputBoard), -7];
    let markerCPU:string = '', 
        bestMove:number  = 0, 
        bestValue:number = 0;

    if(isMaximizing){
        bestValue = -Infinity;
        markerCPU = 'X'
    }else{
        bestValue = Infinity;
        markerCPU = 'O'
    }

    for(const move of availableMove(inputBoard)){
        let newBoard:Array<string|null> = inputBoard.slice();
        newBoard[move] = markerCPU;
        let hypotheticalValue = minMax(newBoard, !isMaximizing)[0];
        if(isMaximizing && hypotheticalValue > bestValue){
            bestValue = hypotheticalValue;
            bestMove = move;
        }
        if(!isMaximizing && hypotheticalValue < bestValue){
            bestValue = hypotheticalValue;
            bestMove = move;
        }
    }
    return [bestValue, bestMove];
}

export function gameIsOver(board:Array<string|null>){
    let winnerMarker = calculateWinner(board),
        isTied = board.filter((el) => el === null).length === 0;
    return winnerMarker || isTied
}
function evaluateBoard(board:Array<string|null>): number{
    let result:string|null = calculateWinner(board)
    if(result === 'X')      return 1
    else if(result === 'O') return -1
    else if(board.filter((el) => el === null).length === 0) return 0;
    return 0;
}

function availableMove(board: Array<string|null>): number[]{
     let moves: number[] = [];
     for(let i=0; i<board.length; i++){
        if(board[i] === null) moves.push(i);
     }
     return moves;
}
 function selectSpace(newBoard:Array<string|null>, move:number, markerCPU:string){

 }