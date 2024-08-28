import Fastify from "fastify";
import dotenv from "dotenv";
import { routes } from "./routes";

dotenv.config();

const fastify = Fastify({ logger: true });

fastify.get("/", (req, res) => {
  res.send({ test: "Hello" });
});

for (const [prefix, route] of Object.entries(routes)) {
  fastify.register(route, { prefix: prefix });
}

const start = async () => {
  try {
    await fastify.listen({ port: Number(process.env.PORT) });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

export default fastify;
