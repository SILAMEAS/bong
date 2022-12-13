"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.findUserAndPost = exports.UsersAndPost = exports.updateUser = exports.CreateUser = exports.findUser = exports.Users = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// export interface User {
//     id: number,
//     name: string,
//     email: string,
//     posts:Post[]
// }
async function Users() {
    return await prisma.user.findMany();
}
exports.Users = Users;
async function findUser(id) {
    return await prisma.user.findUnique(id);
}
exports.findUser = findUser;
async function CreateUser(user) {
    return await prisma.user.create({
        data: {
            name: user.name,
            email: user.email
        }
    });
}
exports.CreateUser = CreateUser;
async function updateUser(user) {
    return await prisma.user.update({
        where: {
            'id': user.id
        },
        data: {
            name: user.name,
            email: user.email,
        }
    });
}
exports.updateUser = updateUser;
//** actions with user and post data **//
async function UsersAndPost() {
    return await prisma.user.findMany({
        include: {
            posts: true,
        },
    });
}
exports.UsersAndPost = UsersAndPost;
function addRelational(query) {
    query.include = {
        posts: true,
    };
}
async function findUserAndPost(id) {
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
exports.findUserAndPost = findUserAndPost;
class UserModel {
    static async createUserAndPost(user, post) {
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
                return { createUser, createPost };
            });
            return {
                data: creation,
                message: "User created",
                statusCode: 200
            };
        }
        catch (err) {
            return {
                data: null,
                message: err.message,
                statusCode: 500
            };
        }
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=UserModel.js.map