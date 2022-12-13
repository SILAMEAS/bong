import {FastifyInstance} from 'fastify';
import {
    Users,
    findUser,
    CreateUser,
    updateUser,
    findUserAndPost,
    UsersAndPost,
    UserModel
} from "../prisma/models/UserModel";
import {Post, User} from "@prisma/client";
import {TestModel} from "../prisma/models/TestModel";
import {PostModel} from "../prisma/models/PostModel";

interface UserParams{
    id: string;
}
interface IHeaders {
    'h-Custom'?: string;
}

export function userRoutes(server: FastifyInstance, prefix: string) {
    server.route<{
        Headers: IHeaders
    }>(
        {
            url: `${prefix}/users`,
            method: 'GET',
            handler: async (request, reply) => {
                try {
                    const users = await UsersAndPost();
                    reply.send({'users': users, 'message': 'get all users'}).status(201)
                } catch (e) {
                    reply.send({'message': "sorry something went wrong!!"}).status(500)
                }
            }
        },
    );

    server.route<{
        Params: UserParams,
        Headers: IHeaders
    }>(
        {
            url: `${prefix}/user/:id`,
            method: 'GET',
            handler: async (request, reply) => {
                try {
                    // const user = await findUserAndPost(parseInt(request.params.id));
                    const user = await TestModel.getItem(parseInt(request.params.id));
                    // const post = await PostModel.getItem(parseInt(request.params.id));
                    reply.send({'user': user, /*'post': post,*/ 'message': 'get user by id'}).status(201)
                } catch (e:any) {
                    reply.send({'message': e.message}).status(500)
                }
            }
        },
    );

    server.route<{
        Body: { user: User, post: Post },
        Headers: IHeaders
    }>(
        {
            url: `${prefix}/user`,
            method: 'POST',
            schema: {
                body: {}
            },
            handler: async (request, reply) => {
                reply.code(200).send("hello world");
                try {
                    const user = await UserModel.createUserAndPost(request.body.user, request.body.post);
                    reply.code(user.statusCode).send({'user': user.data, 'message': user.message});
                } catch (e:any) {
                    reply.code(500).send({'message': e.message});
                }
            }
        },
    );

    server.post<{
        Body: any,
        Headers: IHeaders
    }>('/api/users', function (req, res) {res.send(req.body);});

    server.route<{
        Body: User,
        Headers: IHeaders
    }>(
        {
            url: `${prefix}/user/:id`,
            method: 'PUT',
            handler: async (request, reply) => {
                try {
                    const user = await updateUser(request.body);
                    reply.send({'user': user, 'message': 'get user by id'}).status(201)
                } catch (e:any) {
                    reply.send({'message': e.message}).status(500)
                }
            }
        },
    );
}
