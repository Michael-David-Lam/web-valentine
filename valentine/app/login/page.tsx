// single input login page
// take input from user and hash it using sha256
// if hash matches stored hash, redirect to home page
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AUTH_COOKIE = "valentine_auth";

export default function Login() {
  const router = useRouter();

    const [password, setPassword] = useState("");
    const [loginFailed, setLoginFailed] = useState(false);
    const [shake, setShake] = useState(false);

    // hash the input using sha256
    async function sha256(text: string){
        const input = new TextEncoder().encode(text);
        const hash = await crypto.subtle.digest("SHA-256", input);
        return Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");
    }

    // handle login on click of login button
    const handleLogin = async (): Promise<void> => {
        const hash = await sha256(password);
        if (hash === process.env.NEXT_PUBLIC_SITE_HASH_VALUE) {
            //document.cookie = `${AUTH_COOKIE}=1; path=/; max-age=86400`;
            document.cookie = `${AUTH_COOKIE}=1; path=/`;
            router.push("/");
        } else {
            setLoginFailed(true);
            setShake(true);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-linear-to-br from-pink-200 to-red-200 overflow-hidden">
            <div className='opacity-0 fade-in'>
                <h1 className="flex flex-col gap-8 mb-8 text-3xl font-bold text-[#9eab74] boto">
                        Enter the Secret Password
                </h1>
                <div
                    className={`flex flex-1 flex-col items-center justify-center gap-6 ${shake ? "animate-shake" : ""}`}
                    onAnimationEnd={() => setShake(false)}
                >
                    
                    <input
                        type="password"
                        placeholder="Enter the Secret Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setLoginFailed(false);
                        }}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                        className={`rounded-full px-6 py-2.5 text-sm font-medium shadow-lg placeholder:text-pink-300/80 bg-white/90 text-pink-300/80
                        focus:outline-none focus:ring-2 focus:ring-pink-200
                        transition-colors duration-200
                        ${loginFailed ? "border-2 border-red-400 shadow-red-300/50" : "border border-pink-100/50 shadow-pink-300/50"}`}
                    />
                </div>
                <div className="flex flex-1 flex-col items-center justify-center gap-6 mt-6 ">
                    <button
                            type="button"
                            onClick={handleLogin}
                            className="rounded-full text-white bg-pink-300 hover:bg-pink-400 focus:ring-2 focus:outline-none
                            focus:ring-pink-400 shadow-lg shadow-pink-300/50 dark:shadow-lg dark:shadow-pink-300/80 font-medium text-sm px-8 py-2.5 text-center leading-5"
                        >
                            Guess
                    </button>
                </div>
                
            </div>
            <div className="text-sm text-pink-100 pb-6 text-center">
                    <p>Hint: DD/MM/YYYY</p>
                </div>
        </div>
    );
}