import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function getAttendeeBadge(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/attendees/:attendeeId/badge',
      {
        schema: {
          params: z.object({
            attendeeId: z.coerce.number().int().positive(),
          }),
          response: {
            200: z.object({
              badge: z.object({
                name: z.string(),
                email: z.string().email(),
                eventTitle: z.string(),
                checkInURL: z.string().url()
              })
            })
          }
        }
      },
      async (request, response) => {
        const { attendeeId } = request.params

        const attendee = await prisma.attendee.findUnique({
          select: {
            name: true,
            email: true,
            event: {
              select: {
                title: true,
              }
            }
          },
          where: {
            id: attendeeId,
          }
        })

        if (attendee === null) {
          throw new Error('Attendee not found')
        }

        const baseURL = `${request.protocol}://${request.hostname}`

        const checkInURL = new URL(`/attendee/${attendeeId}/check-in`, baseURL)

        return response.send({
          badge: {
            name: attendee.name,
            email: attendee.email,
            eventTitle: attendee.event.title,
            checkInURL: checkInURL.toString()
          }
        })
      }
    )
}