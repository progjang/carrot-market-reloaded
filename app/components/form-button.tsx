"use client";

import { useFormStatus } from "react-dom";

interface IFormButtonProps {
    text: string;
}
export default function FormButton({text}:IFormButtonProps){
    const {pending} = useFormStatus();
    return <button disabled={pending} 
                   className="h-10 w-full ring-1 bg-orange-400 border-none disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
     >
        {pending ? "Loading...": text}
    </button>
}