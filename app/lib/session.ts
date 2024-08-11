import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface ICookieContent {
    id?:number
}

export default function getSession() {
    return getIronSession<ICookieContent>(cookies(), {
        cookieName: "delicious-karrot",
        password: process.env.COOKIE_PASSWORD!,
    });
     
}