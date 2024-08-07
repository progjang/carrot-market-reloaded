"use server";

import {z} from "zod";
import { PASSWORD_MIN_LENGTH, PASSWORD_NUMBER_REGEX, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "../lib/constants";

const formSchema = z.object({
    email: z.string().email().toLowerCase().includes("@zod.com"),
    username: z.string({
        invalid_type_error: "Username must be a string!",
        required_error: "Where is my username???",
    }).trim().toLowerCase().min(5,"Username should be at least 5 characters long.").transform((username) => `🔥 ${username}`),
    password: z.string({
        required_error: "Password is required",
    }).min(PASSWORD_MIN_LENGTH,"Password should be at least 10 charaters long.").regex(PASSWORD_NUMBER_REGEX, {message: "Password should contain at least one number (0123456789)."}),
});

export async function logIn(prevState: any, formData: FormData) {
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const data = {
        email: formData.get("email"),
        username: formData.get("username"),
        password: formData.get("password"),
    }

    const result = formSchema.safeParse(data);
    
    if(!result.success){
        console.log(result.error.flatten());
        return result.error.flatten();
    } else{
        console.log(result.data);
    }
}