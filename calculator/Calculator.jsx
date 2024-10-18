import React, { useContext } from 'react';
import { Context } from './Context';
import Btn from './Btn';
import { useState } from 'react';

function Calculator() {
    const { buttonState, expression, setExpression, isScientific, setisScientific } = useContext(Context);
    const [result, setResult] = useState("");

    
    const nonScientificButtons = [
        "AC", "%", "CE", "÷",
        "7", "8", "9", "x",
        "4", "5", "6", "-",
        "1", "2", "3", "+",
        "00", "0", ".", "="
    ];

    let size = isScientific ? 5 : 4; 

    // Handler for toggling scientific mode
    const isScientificHandler = () => {
        setisScientific((prev) => !prev); 
    };

    return (
        <div className="h-[45rem] w-[30rem] border-2 border-black rounded-[18px] relative flex flex-col justify-end py-2 bg-black">
            <div className='absolute right-[5%] top-[1%] h-[5rem] w-[5rem] rounded-full bg-black flex
            justify-center items-center select-none
             text-white text-xl font-serif font-bold hover:cursor-pointer '
              onClick={isScientificHandler}>
                sci
            </div>


            <div className='h-[5rem] w-full text-white text-right pr-4 overflow-hidden'>
    <div className='text-3xl text-white whitespace-nowrap expression-marquee'>{expression}</div>
    <div className='text-4xl font-bold'>{result}</div>
</div>



            <div className='flex flex-col space-y-1'>
                {Array.from({ length: Math.ceil((isScientific ? buttonState.length : nonScientificButtons.length) / size) }, (_, i) => (
                    <div key={i} className='flex justify-evenly'>
                        {(isScientific ? buttonState : nonScientificButtons).slice(i * size, i * size + size).map((value, index) => (
                            <Btn key={index} value={value} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Calculator;
