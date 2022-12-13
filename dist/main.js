"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const userRoute_1 = require("./routes/userRoute");
const server = (0, fastify_1.default)({
    pluginTimeout: 20000,
});
const prefix = "/api/v1";
// server.addContentTypeParser('text/json', { parseAs: 'string' }, server.getDefaultJsonParser('ignore', 'ignore'))
(0, userRoute_1.userRoutes)(server, prefix);
server.listen({ port: 3001 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
//# sourceMappingURL=main.js.map