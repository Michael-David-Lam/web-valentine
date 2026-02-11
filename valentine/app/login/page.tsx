// single input login page
// take input from user and hash it using sha256
// if hash matches stored hash, redirect to home page
"use client";
import { useState } from "react";

export default function Login() {

    const [password, setPassword] = useState(""); 

    async function sha256(text: string){
        const input = new TextEncoder().encode(text);
        const hash = await crypto.subtle.digest("SHA-256", input);
        return Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");
    }

    const handleLogin = async (): Promise<void> => {
        const hash = await sha256(password);
        if (hash === process.env.NEXT_PUBLIC_SITE_HASH_VALUE) {
            console.log("Login successful");
        } else {
            console.log("Login failed");
        }
    };
    return (
        <div>
            <h1>Login</h1>
            <input 
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}