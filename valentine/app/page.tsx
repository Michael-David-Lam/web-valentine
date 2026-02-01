"use client";
import Question from "./components/Question";
import Result from "./components/Result";
import { useState } from "react";

export default function Home() {
 
  const [answer, setAnswer] = useState<"Yes" | "No" | null>(null);

  if (answer){
     return(<Result answer={answer} />);
  }
    
  return (<Question onAnswer={setAnswer}/>);
}
