"use client";

// This component animates text falling from the top of the window
export default function HeartRain() {

    const hearts = Array.from({ length: 40 });
    
    return (
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
        {hearts.map((_, i) => (
            <span
            key={i}
            className="absolute animate-fall text-2xl"
            style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
            }}
            >
            💔
            </span>
        ))}
        </div>
    );
 }      

