import Fastify from "fastify";
import { userRoutes } from "./routes/userRoute";

const server = Fastify({
  pluginTimeout: 20000,
});
const prefix = "/api/v1";
// server.addContentTypeParser('text/json', { parseAs: 'string' }, server.getDefaultJsonParser('ignore', 'ignore'))

userRoutes(server, prefix);

server.listen({ port: 3001 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
