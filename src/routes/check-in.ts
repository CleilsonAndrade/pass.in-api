import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";

export async function checkIn(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/attendee/:attendeeId/check-in',
      {
        schema: {
          summary: "Check-in an attendee",
          description: "Responsible for checking in a attendee at a specific event, informing the attendee ID via query param",
          tags: ['check-ins'],
          params: z.object({
            attendeeId: z.coerce.number().int().positive().describe("Attendee registration ID in UUID format")
          }),
          response: {
            201: z.object({
              checkInURL: z.string().url()
            })
          }
        }
      },
      async (request, response) => {
        const { attendeeId } = request.params

        const attendeeCheckIn = await prisma.checkIn.findUnique({
          where: {
            id: attendeeId
          }
        })

        if (attendeeCheckIn !== null) {
          throw new BadRequest('Attendee already checked in')
        }

        await prisma.checkIn.create({
          data: {
            attendeeId
          }
        })

        const baseURL = `${request.protocol}://${request.hostname}`

        const checkInURL = new URL(`/attendee/${attendeeId}/check-in`, baseURL)

        return response.status(201).send({
          checkInURL: checkInURL.toString()
        })
      }
    )
}