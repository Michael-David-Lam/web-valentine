"use client";

type Props = {
    answer: "Yes" | "No";
}

export default function Result({ answer }: Props) {
    let message: string;
    if (answer === "Yes"){
        message = "Yay! 💖";
    } 
    else {
        message = "Oh no 😢";
    }
    return(
         <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-linear-to-br from-pink-200 to-red-200">
            <h1 className="text-3xl font-bold text-[#9eab74]">{message}</h1>
            <p className="text-xl">You chose: {answer}</p>

         </div>
    );

}