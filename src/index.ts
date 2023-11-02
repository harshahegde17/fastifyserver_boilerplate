import { utils } from './helpers/utils';
import fastify from 'fastify'
import pino from 'pino';
import userRouter from './routes/user.router'
// import postRouter from './routes/post.router';
import loadConfig from './config'
import { handleServerError } from './helpers/errors';
loadConfig()

const port = process.env.API_PORT || 5000;

const startServer = async () => {
  try {
    const server = fastify({
      logger: pino({ level: 'info' }),
    })
    server.register(userRouter, { prefix: '/api' })
    // server.register(postRouter, { prefix: '/api/post' })
    server.setErrorHandler((error, request, reply) => {
      server.log.error(error);
      handleServerError(reply, error)
    })
    if (process.env.NODE_ENV === 'production') {
      for (const signal of ['SIGINT', 'SIGTERM']) {
        process.on(signal, () =>
          server.close().then((err) => {
            console.log(`close application on ${signal}`)
            process.exit(err ? 1 : 0)
          }),
        )
      }
    }
    await server.listen(port)
  } catch (e) {
    console.error(e)
  }
}

process.on('unhandledRejection', (e) => {
  console.log("undehandelr^^^^^^^^^^^^^^")
  console.error(e)
  process.exit(1)
})

startServer()

