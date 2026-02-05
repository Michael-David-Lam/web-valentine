"use client";
import { useRef, useState, useEffect } from 'react';

type Props = {
    onAnswer: (value: "Yes" | "No") => void;
}
type Position = {
    x: number;
    y: number
}

const TOO_CLOSE = 50;

export default function Qusetion({ onAnswer }: Props) {
    //Track Button location
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [nButtonPos, setNButtonPos] = useState<Position | null>(null);

    useEffect (() => {
        if (buttonRef.current){
            const rect = buttonRef.current.getBoundingClientRect();
            //Find center point for button element (for more intuitive UI calculations)
            const centerX = rect.left + (rect.width / 2);
            const centerY = rect.top + (rect.height / 2);
            setNButtonPos({x: centerX, y: centerY});
        }
    }, []);

    //Track mouse location
    const [mousePos, setMousePos] = useState<Position | null>(null);
   
    useEffect(() => {
        const updateMousePos = (ev: MouseEvent) => {
            setMousePos({ x: ev.clientX, y: ev.clientY });
        };
        window.addEventListener('mousemove', updateMousePos);
        
        // Cleanup function
        return () => {
            window.removeEventListener('mousemove', updateMousePos);
        };
    }, []);
    
    //Calculates the distance between 2 positions
    const calcDistance = ({x: x1, y: y1}: Position, {x: x2, y: y2}: Position) => {
        return Math.round(Math.sqrt((x2-x1)**2 +(y2-y1)**2));   //euclidean distance formula rounded to nearest integer
    };

    //
    const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
    const mouseHandler = () => {
        if (!mousePos || !buttonRef.current){
                 return;
        };
        const rect = buttonRef.current.getBoundingClientRect();
        //Get center of button
        const x_center = rect.left + rect.width / 2;
        const y_center = rect.top + rect.height / 2;

        //Get vector between mouse → button
        const dx = x_center - mousePos.x;
        const dy = y_center - mousePos.y;

        //Calc distance between button and mouse
        const dist = calcDistance(mousePos, {x: x_center, y: y_center});
        
        //Calc unit vector (direction)
        const dx_unit = dx / dist;
        const dy_unit = dy / dist;
        
        if (dist < TOO_CLOSE){
            setOffset( prev => ({
                x: prev.x + dx_unit * 10, 
                y: prev.y + dy_unit * 10
            }));
        }
    };

    return ( 
        <div 
            onMouseMove={mouseHandler}
            className="flex flex-col items-center justify-center min-h-screen gap-6 bg-linear-to-br from-pink-200 to-red-200">
            <h1 className="flex flex-col gap-8 mb-8 text-3xl font-bold text-[#9eab74] boto">Will you be my Valentine? ❤️</h1>

            <div className="flex gap-8">
                <button type="button" className="rounded-full text-white bg-pink-300
                hover:bg-pink-400 focus:ring-2 
                 focus:outline-none focus:ring-pink-500 shadow-lg 
                 shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-base 
                 text-sm px-8 py-2.5 text-center leading-5"
                 onClick={() => onAnswer("Yes")}
                >
                    Yes
                </button>

                <button ref={buttonRef} type="button" className="rounded-full text-white bg-[#9eab74]
                hover:bg-[#556328] focus:ring-2 
                 focus:outline-none focus:ring-[#556328] shadow-lg 
                 shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-base 
                 text-sm px-8 py-2.5 text-center leading-5 transition-transform duration-500 ease-out"
                 onClick={() => onAnswer("No")}
                 style={{transform: `translate(${offset.x}px, ${offset.y}px)`}} 
                >
                    No
                </button>
            </div>
        </div>
    );
}
