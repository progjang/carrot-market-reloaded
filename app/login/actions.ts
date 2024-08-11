"use server";

import {z} from "zod";
import { PASSWORD_MIN_LENGTH, PASSWORD_NUMBER_REGEX, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "../lib/constants";
import db from "../lib/db";
import bcrypt from "bcrypt"
import getSession from "../lib/session";
import { redirect } from "next/navigation";

const checkEmailExists = async(email:string) => {
    const user = await db.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
        },
    });
    return Boolean(user);
}

const formSchema = z.object({
    email: z.string().email().toLowerCase().refine(checkEmailExists, "An account with this email does not exist."),
    // username: z.string({
    //     invalid_type_error: "Username must be a string!",
    //     required_error: "Where is my username???",
    // }).trim().toLowerCase().min(5,"Username should be at least 5 characters long.").transform((username) => `🔥 ${username}`),
    password: z.string({
        required_error: "Password is required",
    }).min(PASSWORD_MIN_LENGTH,"Password should be at least 4 charaters long.").regex(PASSWORD_NUMBER_REGEX, {message: "Password should contain at least one number (0123456789)."}),
});

export async function logIn(prevState: any, formData: FormData) {
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const data = {
        email: formData.get("email"),
        // username: formData.get("username"),
        password: formData.get("password"),
    }

    const result = await formSchema.safeParseAsync(data);
    
    if(!result.success){
        console.log(result.error.flatten());
        return result.error.flatten();
    } else{
        // find a user with the email => zod validation
        // if the user is found check password hash
        // log the user in
        //redirect "/profile"
        const user = await db.user.findUnique({
            where:{
                email: result.data.email
            },
            select: {
                id: true,
                password: true,
            }
        })
        const ok = await bcrypt.compare(result.data.password, user!.password ?? "");
        if(ok) {
            const session = await getSession();
            session.id = user!.id;
            await session.save();
            redirect("/profile");

        } else{
            return {
                fieldErrors: {
                    email: [""],
                    password: ["Wrong password."],
                },
            }
        }

       
    }
}