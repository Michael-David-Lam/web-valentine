"use client";
import { useRef, useState, useEffect } from 'react';

type Props = {
    onAnswer: (value: "Yes" | "No") => void;
}
type Position = {
    x: number;
    y: number
}

export default function Qusetion({ onAnswer }: Props) {
    //Track Button location
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [nButtonPos, setNButtonPos] = useState<Position | null>(null)

    useEffect (() => {
        if (buttonRef.current){
            const rect = buttonRef.current.getBoundingClientRect();
            setNButtonPos({x: rect.left, y: rect.top});
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


    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-linear-to-br from-pink-200 to-red-200">
            <h1 className="text-3xl font-bold text-[#9eab74]">Will you be my Valentine? ❤️</h1>

            <div className="flex gap-4">
                <button type="button" className="rounded-full text-white bg-pink-300
                hover:bg-pink-400 focus:ring-2 
                 focus:outline-none focus:ring-pink-500 shadow-lg 
                 shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-base 
                 text-sm px-4 py-2.5 text-center leading-5"
                 onClick={() => onAnswer("Yes")}
                >
                    Yes
                </button>

                <button ref={buttonRef} type="button" className="rounded-full text-white bg-[#9eab74]
                hover:bg-[#556328] focus:ring-2 
                 focus:outline-none focus:ring-[#556328] shadow-lg 
                 shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-base 
                 text-sm px-4 py-2.5 text-center leading-5"
                 onClick={() => onAnswer("No")}
                >
                    No
                </button>
                
            </div>
            <div>Mouse is at X:{mousePos?.x} and Y: {mousePos?.y}</div>
            <div>Button is at X:{nButtonPos?.x} and Y: {nButtonPos?.y}</div>
        </div>
    );
}
