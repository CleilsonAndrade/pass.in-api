import { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { BadRequest } from "./routes/_errors/bad-request";

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, response) => {

  if (error instanceof ZodError) {
    return response.status(400).send({
      message: `Error during validation`,
      errors: error.flatten().fieldErrors
    })
  }

  if (error instanceof BadRequest) {
    return response.status(400).send({ message: error.message })
  }

  return response.status(500).send({ message: "An unexpected error occurred" })
}