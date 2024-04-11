import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";

export async function getAttendeeBadge(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/attendees/:attendeeId/badge',
      {
        schema: {
          summary: "Get an attendee badge",
          description: "Responsible for allowing a attendees registration badge to be viewed, informing the attendees ID via query param",
          tags: ['attendees'],
          params: z.object({
            attendeeId: z.coerce.number().int().positive().describe("Attendee registration ID in Integer format"),
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
          throw new BadRequest('Attendee not found')
        }

        const baseURL = `${request.protocol}://${request.hostname}`

        const checkInURL = new URL(`/attendee/${attendeeId}/check-in`, baseURL)

        return response.status(200).send({
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