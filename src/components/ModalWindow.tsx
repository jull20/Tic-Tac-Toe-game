import Button from './Button';
import type {modalWindowType} from './types' 

export default function ModalWindow({type, winnerMark, gameMode, isMainUserWin, onClickSilverBtn, onClickYellowBtn}: modalWindowType){
    let silverBtnName:string = '', yellowBtnName:string = '', markImg:string = '', colorWinner:string = '', text:string = '', resultComment:string = '';
    switch(type){
        case 'restart':
            silverBtnName = 'NO, CANCEL'
            yellowBtnName = 'YES, RESTART'
            text = 'RESTART GAME?'
            break;
        case 'return':
            silverBtnName = 'CANCEl'
            yellowBtnName = 'RETURN'
            text = 'RETURN TO THE MAIN MENU?'
            break;  
        case 'tied':
            silverBtnName = 'QUIT'
            yellowBtnName = 'NEXT ROUND'
            text = 'ROUND TIED'
            break;
        case 'end game':
            silverBtnName = 'QUIT'
            yellowBtnName = 'NEXT ROUND'
            if(winnerMark === 'X'){
                markImg = 'icon-x.svg';
                colorWinner = ' text-blue '
            }else{
                markImg = 'icon-o.svg';
                colorWinner = ' text-yellow '
            }
            break;                                  
    }
    if(gameMode === 'solo') resultComment = isMainUserWin ? 'YOU WON!' : 'OH NO, YOU LOST…'
    else resultComment = isMainUserWin ? 'PLAYER 1 WINS!' : 'PLAYER 2 WINS!'
    return (
        <section className="w-screen h-screen bg-black/55 absolute top-0 left-0 z-100">
            <div className="w-screen sm:h-[228px] md:h-[266px] bg-semi-dark-navy absolute top-[34%] left-0 flex flex-col justify-center items-center sm:gap-y-[20px] md:gap-y-[30px]">
                
                {
                    type === 'end game' 
                    ?   <>
                            <p className="sm:text-body md:text-heading-xs text-silver">{resultComment}</p>
                            <div className="flex flex-row justify-center items-center sm:gap-x-[8px] md:gap-x-[24px]">
                                <img className="sm:size-[30px] md:size-[64px]" src={markImg} alt="winner mark" />
                                <p className={"sm:text-heading-m md:text-heading-l text-center" + colorWinner}>TAKES THE ROUND</p>
                            </div>
                        </>
                    : <p className={"sm:text-heading-m md:text-heading-l text-center text-silver"}>{text}</p>
                }

                <div className="flex flex-row justify-center items-center gap-x-[16px] w-custom">
                    <Button name="quit"       handleClick={onClickSilverBtn}>{silverBtnName}</Button>
                    <Button name="next round" handleClick={onClickYellowBtn}>{yellowBtnName}</Button>
                </div>


            </div>
        </section>
    )
}