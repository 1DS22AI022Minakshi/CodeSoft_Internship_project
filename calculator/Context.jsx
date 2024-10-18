import React, { createContext, useEffect } from 'react';
import { useState } from 'react';
const Context = createContext();

function APPContext({ children }) {

    const [buttonState, setButtonState] = useState([]);
    const [expression, setExpression] = useState("");
    const [isevaluated, setisevaluated] = useState(false);
    const[isScientific, setisScientific] = useState(false);

    useEffect(() => {
        setButtonState([
            "sin", "cos", "tan", "rad", "deg",
             "log", "ln", "(", ")", "inv",
                "!","AC", "%", "CE", "÷",
                "^", "7", "8", "9", "x",
                    "√", "4", "5", "6", "-", 
                "π", "1", "2", "3", "+",
                "e", "00", "0", ".", "=",
        ]);
    }, []);


    const contextValue = {
        buttonState,
        setButtonState,
        expression,
        setExpression,
        isevaluated,
        setisevaluated,
        isScientific,
        setisScientific
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
}

export { APPContext, Context };