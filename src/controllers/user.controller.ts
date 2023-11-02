import { FastifyReply, FastifyRequest } from "fastify"
import { STANDARD } from "../helpers/constants"
import { handleServerError } from "../helpers/errors"

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        console.log("coming here------")
      reply.code(STANDARD.SUCCESS).send({
        name: "Test User",
        userId: "123",
      })
    } catch (err) {
      handleServerError(reply, err)
    }
}