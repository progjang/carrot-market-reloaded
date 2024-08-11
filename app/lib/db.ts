import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();


async function test() {
    const user = await db.user.create({
        data:{
            username: "nicolas",
            password: "aaaaaaaaaa1",
            email:"las@zod.com"
        }
    });
    console.log(user);
}

//test();

export default db;