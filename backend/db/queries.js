import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function createUser(username, password, first_name, last_name){
    await prisma.user.create({
        data:{
            username, password, first_name, last_name
        }
    })
}

export async function getUserByUsername(username){
    const user = await prisma.user.findFirst({
        where:{
            username
        }
    })

    return user
}