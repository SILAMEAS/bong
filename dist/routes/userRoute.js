"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const UserModel_1 = require("../prisma/models/UserModel");
const TestModel_1 = require("../prisma/models/TestModel");
function userRoutes(server, prefix) {
    server.route({
        url: `${prefix}/users`,
        method: 'GET',
        handler: async (request, reply) => {
            try {
                const users = await (0, UserModel_1.UsersAndPost)();
                reply.send({ 'users': users, 'message': 'get all users' }).status(201);
            }
            catch (e) {
                reply.send({ 'message': "sorry something went wrong!!" }).status(500);
            }
        }
    });
    server.route({
        url: `${prefix}/user/:id`,
        method: 'GET',
        handler: async (request, reply) => {
            try {
                // const user = await findUserAndPost(parseInt(request.params.id));
                const user = await TestModel_1.TestModel.getItem(parseInt(request.params.id));
                // const post = await PostModel.getItem(parseInt(request.params.id));
                reply.send({ 'user': user, /*'post': post,*/ 'message': 'get user by id' }).status(201);
            }
            catch (e) {
                reply.send({ 'message': e.message }).status(500);
            }
        }
    });
    server.route({
        url: `${prefix}/user`,
        method: 'POST',
        schema: {
            body: {}
        },
        handler: async (request, reply) => {
            reply.code(200).send("hello world");
            try {
                const user = await UserModel_1.UserModel.createUserAndPost(request.body.user, request.body.post);
                reply.code(user.statusCode).send({ 'user': user.data, 'message': user.message });
            }
            catch (e) {
                reply.code(500).send({ 'message': e.message });
            }
        }
    });
    server.post('/api/users', function (req, res) { res.send(req.body); });
    server.route({
        url: `${prefix}/user/:id`,
        method: 'PUT',
        handler: async (request, reply) => {
            try {
                const user = await (0, UserModel_1.updateUser)(request.body);
                reply.send({ 'user': user, 'message': 'get user by id' }).status(201);
            }
            catch (e) {
                reply.send({ 'message': e.message }).status(500);
            }
        }
    });
}
exports.userRoutes = userRoutes;
//# sourceMappingURL=userRoute.js.map