export default function MainMenu({selectMarker, selectGameMode}: {selectMarker: (marker:string)=>void, selectGameMode: (marker:string)=>void}){
    return(
        <article className="w-custom flex flex-col sm:gap-y-[32px] md:gap-y-[40px]">
            <div className="logo"><img src="logo.svg" alt="" /></div>
            <section className="w-full bg-semi-dark-navy flex flex-col gap-y-[20px] justify-center items-center p-[24px] inset-shadow-sm inset-shadow-[rgba(16,33,42,1)] rounded-[15px]">
                <h4 className="text-heading-xs text-silver pb-[8px]">PICK PLAYER 1’S MARK</h4>
                <div className="w-full bg-dark-navy rounded-[10px] p-[9px] ">
                    <RadioButton />
                </div>
                <p className="text-body text-silver">REMEMBER : X GOES FIRST</p>
            </section>
            <section className="w-full flex flex-col sm:gap-y-[16px] md:gap-y-[20px]">
                <Button color='yellow' handleClick={()=>selectGameMode('solo')}> NEW GAME (VS CPU) </Button>
                <Button color='blue'   handleClick={()=>selectGameMode('multiplayer')}> NEW GAME (VS PLAYER) </Button>
            </section>
        </article>
    )
}

function Button({children, color, handleClick}: {children:string, color:string, handleClick:()=>void}){
    let btnColor:string = (color === 'yellow') 
        ? ` bg-yellow inset-shadow-yellow-dark hover:bg-yellow-light active:brightness-50` 
        : ` bg-blue   inset-shadow-blue-dark   hover:bg-blue-light   active:brightness-50`
    return(
        <button 
            className={"w-full sm:h-[56px] md:h-[67px] rounded-[15px] inset-shadow-sm text-heading-xs text-dark-navy transition delay-30 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 " + btnColor}
            onClick={handleClick}
        >
           {children}
        </button>
    )
}

function RadioButton(){
    return(
        <div>
            <input type="radio" name="marker" id="cross" />
            <input type="radio" name="marker" id="zero" defaultChecked />
        </div>
    )
}