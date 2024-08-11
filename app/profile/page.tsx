import db from "../lib/db";
import getSession from "../lib/session";
import {notFound, redirect} from "next/navigation";
async function getUser() {
    const session = await getSession();
    if(session.id){
        const user = await db.user.findUnique({
            where: {
                id: session.id,
            },
        });
        if(user){
            return user;
        }
    }
    notFound();
}

export default async function Profile() {
    const user = await getUser();
    const logOut = async () => {
        "use server";
        const session = await getSession();
        await session.destroy();
        redirect("/");
    }
    return (
        <div className="flex flex-col items-center gap-10 py-8 px-6">
            <div className="flex flex-col">
                <div className="font-bold mb-5">
                <span>welcome!</span> <span className="text-teal-700">{user?.username}</span>
                </div>

        <span>username: {user?.username}</span>
        <span>email: {user?.email}</span>
            </div>

        <form action={logOut}>
            <button className="p-2 text-center h-10 w-full ring-1 bg-orange-400 border-none disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed">Log out</button>
        </form>
    </div>
    )

}