"use client";

import { useState } from "react";

export default function QusetionPage() {

    const [answer, setAnswer] = useState<string | null>(null);
    

    return (
        <main className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gradient-to-br from-pink-200 to-red-200">
            <h1 className="text-3xl font-bold text-[#9eab74]">Will you be my Valentine? ❤️</h1>

            <div className="flex gap-4">
                <button type="button" className="rounded-full border text-white bg-pink-300
                hover:bg-pink-400 focus:ring-2 
                 focus:outline-none focus:ring-pink-500 shadow-lg 
                 shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-base 
                 text-sm px-4 py-2.5 text-center leading-5">
                    Yes
                </button>

                <button type="button" className="rounded-full border text-white bg-[#9eab74]
                hover:bg-[#556328] focus:ring-2 
                 focus:outline-none focus:ring-pink-500 shadow-lg 
                 shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-base 
                 text-sm px-4 py-2.5 text-center leading-5">
                    No
                </button>
            </div>

            {answer && (
                <p className="text-xl">
                    You selected: <strong>{answer}</strong>
                </p>
            )}
        </main>
    );
}
