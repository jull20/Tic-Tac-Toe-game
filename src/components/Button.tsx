export default function Button({children, name, handleClick}: {children:string |  React.ReactNode, name:string, handleClick:()=>void}){
    let color:string = '', btnSize:string = '', shadowSize:string = '', btnColor:string = '';
    switch (name){
        case 'new game cpu':
            color = 'yellow'
            btnSize = ` w-full sm:h-[56px] md:h-[67px] rounded-[15px] `;
            shadowSize = ' inset-shadow-md ';
            btnColor =` bg-yellow inset-shadow-yellow-dark hover:bg-yellow-light active:brightness-50 `;
            break;
        case 'new game player':
            color = 'blue'
            btnSize = ` w-full sm:h-[56px] md:h-[67px] rounded-[15px] `;
            shadowSize = ' inset-shadow-md ';
            btnColor =` bg-blue inset-shadow-blue-dark hover:bg-blue-light active:brightness-50 `;
            break;
        case 'restart':
            color = 'silver'
            btnSize = ` sm:w-[40px] sm:h-[40px] md:w-[52px] md:h-[52px] rounded-[5px] `                       
            shadowSize = ' inset-shadow-sm ';
            btnColor =` bg-silver inset-shadow-silver-dark hover:bg-silver-light active:brightness-50 `;
            break; 
        case 'next round':
            color = 'yellow'
            btnSize = ` px-[18px] py-[16px] rounded-[10px] `                       
            shadowSize = ' inset-shadow-sm ';
            btnColor =` bg-yellow inset-shadow-yellow-dark hover:bg-yellow-light active:brightness-50 `;
            break;
        case 'quit':
            color = 'silver'
            btnSize = ` p-[16px] rounded-[10px] `                       
            shadowSize = ' inset-shadow-sm ';
            btnColor =` bg-silver inset-shadow-silver-dark hover:bg-silver-light active:brightness-50 `;
            break;                        
    }
    
    return(
        <button 
            className={btnColor + btnSize + shadowSize + " flex flex-col justify-center items-center text-heading-xs text-dark-navy cursor-pointer transition delay-30 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 "}
            onClick={handleClick}
        >
           { children }
        </button>
    )
}