import {PrismaClient, Prisma, User, Post} from '@prisma/client'
import {DBTransaction} from "../../utils/response";

const prisma = new PrismaClient();

// export interface User {
//     id: number,
//     name: string,
//     email: string,
//     posts:Post[]
// }

export async function Users() {
    return await prisma.user.findMany();
}

export async function findUser(id: any) {
    return await prisma.user.findUnique(id);
}

export async function CreateUser(user: User) {
    return await prisma.user.create({
        data: {
            name: user.name,
            email: user.email
        }
    })
}

export async function updateUser(user: User) {
    return await prisma.user.update({
        where: {
            'id': user.id
        },
        data: {
            name: user.name,
            email: user.email,
        }
    })
}

//** actions with user and post data **//
export async function UsersAndPost() {
    return await prisma.user.findMany(
        {
            include: {
                posts: true,
            },
        }
    );
}

function addRelational(query: any){
    query.include = {
        posts: true,
    };
}

export async function findUserAndPost(id: number) {
    const query = {
        where: {
            id: id,
        },
        include: {}
    };

    console.log(query);
    addRelational(query);
    console.log(query);
    return await prisma.user.findMany(query);
}

export class UserModel {
    public static async createUserAndPost(user: Prisma.UserCreateInput, post: Post):Promise<DBTransaction> /*Promise<{user: User, post:Post}>*/ {
        try {
            const creation = await prisma.$transaction(async (tx) => {
                const createPost = await tx.post.create({
                    data: {
                        title: post?.title,
                        content: post.content,
                        authorId: post.authorId
                    }
                });
                const createUser = await tx.user.create({
                    data: {
                        name: user.name,
                        email: user.email
                    }
                });

                return {createUser, createPost};
            });
            return {
                data: creation,
                message: "User created",
                statusCode: 200
            };
        } catch (err: any) {
            return {
                data: null,
                message: err.message,
                statusCode: 500
            };
        }
    }
}