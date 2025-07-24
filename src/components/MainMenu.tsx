import { useNavigate } from 'react-router-dom';
import Button from "./Button"
import type React from 'react';
import { useContext } from 'react';
import { LanguageContext } from '../App';

const text = {
    en: {
        1: 'PICK PLAYER 1’S MARK',
        2: 'REMEMBER : X GOES FIRST',
        3: 'NEW GAME (VS CPU)',
        4: 'NEW GAME (VS PLAYER)'
    },
    ru: {
        1: 'ВЫБЕРИТЕ ОТМЕТКУ ИГРОКА 1',
        2: 'ПОМНИТЕ: X ХОДИТ ПЕРВЫМ',
        3: 'НОВАЯ ИГРА (VS ИИ)',
        4: 'НОВАЯ ИГРА (VS ИГРОК)'
    }
}

export default function MainMenu({selectMarker, selectGameMode, selectLenguage}: {selectMarker: (marker:string)=>void, selectGameMode: (mode:string)=>void, selectLenguage: (mode:string)=>void}){
    const language = useContext(LanguageContext);
    const navigate = useNavigate();
    const startGame = (mode:string) => {
        selectGameMode(mode);
        navigate('game', { replace: false })
    }
    return(
        <article className="w-custom flex flex-col items-center self-center sm:gap-y-[32px] md:gap-y-[40px]">
            <div className="w-full flex flex-row justify-center items-center relative">
                <img src="logo.svg" alt="" />
                <ToggleLenguage selectLenguage={selectLenguage}/>
            </div>
            <section className="w-full bg-semi-dark-navy flex flex-col gap-y-[20px] justify-center items-center p-[24px] inset-shadow-md inset-shadow-[rgba(16,33,42,1)] rounded-[15px]">
                <h4 className="text-heading-xs text-silver text-center pb-[8px] text-balance">{text[language as keyof typeof text][1]}</h4>
                <div className="w-full h-[72px] bg-dark-navy rounded-[10px] p-[9px] ">
                    <RadioButton handleClick={selectMarker}/>
                </div>
                <p className="text-body text-silver">{text[language as keyof typeof text][2]}</p>
            </section>
            <section className="w-full flex flex-col sm:gap-y-[16px] md:gap-y-[20px]">
                <Button name='new game cpu'    handleClick={()=>startGame('solo')}       > {text[language as keyof typeof text][3]} </Button>
                <Button name='new game player' handleClick={()=>startGame('multiplayer')}> {text[language as keyof typeof text][4]} </Button>
            </section>
        </article>
    )
}

function ToggleLenguage({selectLenguage}: {selectLenguage:(l:string)=>void}){
    const language = useContext(LanguageContext);
    const checked = {checked: language === 'ru'};
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.currentTarget.checked ? selectLenguage('ru') : selectLenguage('en')
    }
    return(
        <div className="themeToggle absolute top-[50%] right-0 -translate-y-1/2">
            <label className="switchTheme">
                <p className='text-body text-dark-navy absolute bottom-[4px] left-[4px] z-1 before:z-110'>ru</p>
                <input type="checkbox" onChange={handleChange} {...checked}/>
                <span className="switch round before:z-100"></span>
                <p className='text-body text-dark-navy absolute bottom-[4px] right-[4px] before:z-50'>en</p>
            </label>
        </div>
    )
}


function RadioButton({handleClick}: {handleClick: (marker:string)=>void}){
    const radioBtnStyle = "*:appearance-none *:w-full *:h-full *:rounded-[10px] *:cursor-pointer *:checked:bg-silver *:checked:hover:bg-silver *:hover:bg-semi-dark-navy *:bg-no-repeat *:bg-size-[32px_32px] *:bg-center *:transition *:delay-30 *:duration-300 *:ease-in-out"
    const zeroImgStyle =  "bg-[url(../../icon-o-light.svg)] checked:bg-[url(../../icon-o-dark.svg)]"
    const crossImgStyle = "bg-[url(../../icon-x-light.svg)] checked:bg-[url(../../icon-x-dark.svg)]"
    return(
        <div className={"w-full h-full flex flex-row gap-x-2 " + radioBtnStyle}>
            <input onClick={()=>handleClick('X')} className={crossImgStyle} type="radio" name="marker" id="cross" />
            <input onClick={()=>handleClick('O')} className={zeroImgStyle}  type="radio" name="marker" id="zero" defaultChecked />
        </div>
    )
}  