import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createUser = {
    name: 'Alice',
    email: 'alice@prisma.io',
};

const createUserAndPost = {
    name: 'Bob',
    email: 'bob@prisma.io',
    posts: {
        create: {
            title: 'Hello World',
        },
    },
}


const findUserAndPost = {
    include: {
        posts: true,
    },
};

async function main() {
    const creUser = await prisma.user.create({
        data: createUser
    });
    console.log(creUser)
    const creUserPost = await prisma.user.create({
        data: createUserAndPost,
    });
    console.log(creUserPost)
    const user = await prisma.user.findMany(findUserAndPost);
    console.log(user)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })