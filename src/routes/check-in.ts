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
            attendeeId: z.coerce.number().int()
          }),
          response: {
            201: z.null()
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

        return response.status(201).send()
      }
    )
}