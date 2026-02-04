"use client";

type Props = {
    answer: "Yes" | "No";
    onBack: () => void;
}

export default function Result({ answer, onBack }: Props) {
    let message: string;
    let buttonText: string;
    if (answer === "Yes"){
        message = "Yay! 💖";
        buttonText = "Say yes again?"
    } 
    else {
        message = "Oh no! Don't break my heart... 😢";
        buttonText = "Plesase recondisder... :("
    }
    return(
         <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-linear-to-br from-pink-200 to-red-200">
            <h1 className="text-3xl font-bold text-[#9eab74]">{message}</h1>
            <p className="text-xl text-pink-400">You chose: {answer}</p>
            <button className="rounded-full border text-[#9eab74] bg-pink-200
                hover:bg-pink-300 focus:ring-2 
                 focus:outline-none focus:ring-[#9eab74] shadow-lg 
                 shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-base 
                 text-sm px-4 py-2.5 text-center leading-5"
                 onClick={onBack}
            >
            {buttonText}
            </button>
         </div>
    );  

}