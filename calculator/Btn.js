import React, { useContext, useState } from 'react';
import { Context } from './Context';

function Btn({ value }) {
    const { expression, setExpression, isScientific } = useContext(Context);
    const [isEvaluated, setIsEvaluated] = useState(false);

    function expressionHandler() {
        let updatedExpression;

        if (isEvaluated && isNum(value)) {
            setExpression("");
            setIsEvaluated(false);
            return;
        }

        if (value === "AC") {
            setExpression("");
            return;
        } else if (value === "CE") {
            setExpression(expression.slice(0, -1));
            return;
        } else if (value === "=") {
            resultCalculator();
            return;
        } else if (["sin", "cos", "tan", "√", "log", "ln"].includes(value)) {
            updatedExpression = `${expression}${value}(`;
        } else if (value === "inv") {
            updatedExpression = `${expression}1/(`;
        } else {
            updatedExpression = `${expression}${value}`;
        }

        setExpression(updatedExpression);
    }

    function isNum(value) {
        return /^-?\d+(\.\d+)?$/.test(value);
    }

    async function resultCalculator() {
        try {
            let formattedExpression = expression
                .replace(/÷/g, '/')
                .replace(/x/g, '*')
                .replace(/√/g, 'Math.sqrt(')
                .replace(/π/g, Math.PI)
                .replace(/e/g, Math.E);

            // Handle trigonometric functions
            formattedExpression = formattedExpression
                .replace(/sin\(([^)]+)\)/g, (_, angle) => `Math.sin(${angle} * (Math.PI / 180))`)
                .replace(/cos\(([^)]+)\)/g, (_, angle) => `Math.cos(${angle} * (Math.PI / 180))`)
                .replace(/tan\(([^)]+)\)/g, (_, angle) => `Math.tan(${angle} * (Math.PI / 180))`);

            // Handle logarithmic functions
            formattedExpression = formattedExpression
                .replace(/log\(([^)]+)\)/g, 'Math.log10($1)')
                .replace(/ln\(([^)]+)\)/g, 'Math.log($1)');

            // Handle factorials
            formattedExpression = formattedExpression.replace(/([^!]+)!/g, (match, num) => {
                num = parseInt(num, 10);
                return num >= 0 ? factorial(num) : "NaN";
            });

            // Handle inverse
            formattedExpression = formattedExpression.replace(/1\/\(([^)]+)\)/g, '(1/$1)');

            // Handle powers
            formattedExpression = formattedExpression.replace(/\^/g, '**');

            // Leading zeros handling
            formattedExpression = formattedExpression.replace(/(^0+)(?=[1-9])/g, '');

            // Check for division by zero
            if (formattedExpression.includes('/0')) {
                setExpression("Error: Division by zero");
                return;
            }

            const result = eval(formattedExpression);
            setExpression(result.toString());
            setIsEvaluated(true);
        } catch (error) {
            setExpression("Error");
            setIsEvaluated(true);
        }
    }

    function factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    return (
        <>
            {isScientific ? (
                <div
                    className='w-[4rem] h-[4rem] rounded-full bg-[#242731]
                    text-white flex justify-center items-center text-xl font-bold font-serif 
                    select-none hover:cursor-pointer'
                    onClick={expressionHandler}
                >
                    {value}
                </div>
            ) : (
                <div
                    className='w-[5rem] h-[5rem] rounded-full bg-[#242731]
                    text-white flex justify-center items-center text-xl font-bold font-serif 
                    select-none hover:cursor-pointer'
                    onClick={expressionHandler}
                >
                    {value}
                </div>
            )}
        </>
    );
}

export default Btn;
