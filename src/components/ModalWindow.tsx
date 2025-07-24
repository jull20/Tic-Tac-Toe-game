import { useContext } from 'react';
import Button from './Button';
import type {modalWindowType} from './types' 
import { LanguageContext } from '../App';

const text = {
    en:{
        1:  'NO, CANCEL',
        2:  'YES, RESTART',
        3:  'RESTART GAME?',
        4:  'CANCEl',
        5:  'RETURN',
        6:  'RETURN TO THE MAIN MENU?',
        7:  'QUIT',
        8:  'NEXT ROUND',
        9:  'ROUND TIED',
        10: 'YOU WON!',
        11: 'OH NO, YOU LOST…',
        12: 'PLAYER 1 WINS!',
        13: 'PLAYER 2 WINS!',
        14: 'TAKES THE ROUND',
    },
    ru:{
        1:  'НЕТ, ЗАКРЫТЬ',
        2:  'ДА, ПЕРЕЗАПУСТИТЬ',
        3:  'Перезапустить игру?',
        4:  'ЗАКРЫТЬ',
        5:  'ВЕРНУТЬСЯ',
        6:  'Вернуться в главное меню?',
        7:  'ВЫЙТИ',
        8:  'ПРОДОЛЖИТЬ',
        9:  'НИЧЬЯ',
        10: 'ТЫ ВЫИГРАЛ!',
        11: 'О НЕТ, ТЫ ПРОИГРАЛ…',
        12: 'ИГРОК 1 ПОБЕДИЛ!',
        13: 'ИГРОК 2 ПОБЕДИЛ!',
        14: 'ВЫИГРАЛ РАУНД',
    }
}

export default function ModalWindow({type, winnerMark, gameMode, isMainUserWin, onClickSilverBtn, onClickYellowBtn}: modalWindowType){
    const language = useContext(LanguageContext);
    let textContent = text[language as keyof typeof text];
    let silverBtnName:string = '', yellowBtnName:string = '', markImg:string = '', colorWinner:string = '', content:string = '', resultComment:string = '';
    switch(type){
        case 'restart':
            silverBtnName = textContent[1];
            yellowBtnName = textContent[2];
            content =       textContent[3];
            break;
        case 'return':
            silverBtnName = textContent[4];
            yellowBtnName = textContent[5];
            content =       textContent[6];
            break;  
        case 'tied':
            silverBtnName = textContent[7];
            yellowBtnName = textContent[8];
            content =       textContent[9];
            break;
        case 'end game':
            silverBtnName = textContent[7];
            yellowBtnName = textContent[8];
            if(winnerMark === 'X'){
                markImg = 'icon-x.svg';
                colorWinner = ' text-blue '
            }else{
                markImg = 'icon-o.svg';
                colorWinner = ' text-yellow '
            }
            break;                                  
    }
    if(gameMode === 'solo') resultComment = isMainUserWin ? textContent[10] : textContent[11]
    else resultComment = isMainUserWin ? textContent[12] : textContent[13]
    return (
        <section className="w-screen h-screen bg-black/55 absolute top-0 left-0 z-100">
            <div className="w-screen sm:h-[228px] md:h-[266px] bg-semi-dark-navy absolute top-[34%] left-0 flex flex-col justify-center items-center sm:gap-y-[20px] md:gap-y-[30px]">
                {
                    type === 'end game' 
                    ?   <>
                            <p className="sm:text-body md:text-heading-xs text-silver">{resultComment}</p>
                            <div className="flex flex-row justify-center items-center sm:gap-x-[8px] md:gap-x-[24px]">
                                <img className="sm:size-[30px] md:size-[64px]" src={markImg} alt="winner mark" />
                                <p className={"sm:text-heading-m md:text-heading-l text-center" + colorWinner}>{textContent[14]}</p>
                            </div>
                        </>
                    : <p className={"w-[90vw] sm:text-heading-m md:text-heading-l text-center text-silver"}>{content}</p>
                }

                <div className="w-[90vw] flex flex-row justify-center items-center gap-[16px] flex-wrap-reverse w-custom">
                    <Button name="quit"       handleClick={onClickSilverBtn}>{silverBtnName}</Button>
                    <Button name="next round" handleClick={onClickYellowBtn}>{yellowBtnName}</Button>
                </div>
            </div>
        </section>
    )
}