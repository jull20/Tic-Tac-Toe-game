import { useNavigate } from 'react-router-dom';
import Button from "./Button"
import { useEffect } from 'react';

export default function MainMenu({selectMarker, selectGameMode}: {selectMarker: (marker:string)=>void, selectGameMode: (mode:string)=>void}){
    const navigate = useNavigate();
    const startGame = (mode:string) => {
        selectGameMode(mode);
        navigate('game', { replace: false })
    }
    useEffect(()=>selectMarker('O'), []);
    return(
        <article className="w-custom flex flex-col items-center self-center sm:gap-y-[32px] md:gap-y-[40px]">
            <div className="logo"><img src="logo.svg" alt="" /></div>
            <section className="w-full bg-semi-dark-navy flex flex-col gap-y-[20px] justify-center items-center p-[24px] inset-shadow-sm inset-shadow-[rgba(16,33,42,1)] rounded-[15px]">
                <h4 className="text-heading-xs text-silver pb-[8px]">PICK PLAYER 1’S MARK</h4>
                <div className="w-full h-[72px] bg-dark-navy rounded-[10px] p-[9px] ">
                    <RadioButton handleClick={selectMarker}/>
                </div>
                <p className="text-body text-silver">REMEMBER : X GOES FIRST</p>
            </section>
            <section className="w-full flex flex-col sm:gap-y-[16px] md:gap-y-[20px]">
                <Button name='new game cpu'    handleClick={()=>startGame('solo')}       > NEW GAME (VS CPU)    </Button>
                <Button name='new game player' handleClick={()=>startGame('multiplayer')}> NEW GAME (VS PLAYER) </Button>
            </section>
        </article>
    )
}



function RadioButton({handleClick}: {handleClick: (marker:string)=>void}){
    // const radioBtnStyle = "appearance-none w-full h-full rounded-[10px] cursor-pointer checked:bg-silver checked:hover:bg-silver hover:bg-semi-dark-navy bg-no-repeat bg-size-[32px_32px] bg-center"
    const radioBtnStyle = "*:appearance-none *:w-full *:h-full *:rounded-[10px] *:cursor-pointer *:checked:bg-silver *:checked:hover:bg-silver *:hover:bg-semi-dark-navy *:bg-no-repeat *:bg-size-[32px_32px] *:bg-center *:transition *:delay-30 *:duration-300 *:ease-in-out"
    const zeroImgStyle =  "bg-[url(icon-o-light.svg)] checked:bg-[url(icon-o-dark.svg)]"
    const crossImgStyle = "bg-[url(icon-x-light.svg)] checked:bg-[url(icon-x-dark.svg)]"
    return(
        <div className={"w-full h-full flex flex-row gap-x-2 " + radioBtnStyle}>
            <input onClick={()=>handleClick('X')} className={crossImgStyle} type="radio" name="marker" id="cross" />
            <input onClick={()=>handleClick('O')} className={zeroImgStyle} type="radio" name="marker" id="zero" defaultChecked />

            {/* <label className="w-full h-full relative" >
                <img className="absolute t-0 l-0 w-[32px] h-[32px]" src="icon-x-dark.svg" alt="" />
                <input className={radioBtnStyle} type="radio" name="marker" id="cross" />
            </label>
            <label className="w-full h-full">
                <img className="absolute t-0 l-0 w-[32px] h-[32px] z-100" src="icon-o-dark.svg" alt="" />
                <input className={radioBtnStyle + ' zero'} type="radio" name="marker" id="zero" defaultChecked />
            </label> */}

        </div>
    )
}