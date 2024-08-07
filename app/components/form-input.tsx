import { InputHTMLAttributes } from "react";

interface FormInputProps {
    name: string;
    errors?: string[];
}

export default function FormInput({name, errors=[], ...rest}:FormInputProps & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className="flex flex-col gap-2">
            <input className="bg-transparent rounded-md w-full h-10 p-2
            focus:outline-none ring-1 focus:ring-2 ring-neutral-200
            focus:ring-orange-400 border-none placeholder:text-neutral-400"
            name={name}
            {...rest}
            />
            {errors.map((error, index) => (
                <span key={index} className="text-red-500 font-medium">{error}</span>
            ))}
        </div>

    );
}