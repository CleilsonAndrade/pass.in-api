import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod'
import { errorHandler } from './error-handling'
import { checkIn } from './routes/check-in'
import { createEvent } from './routes/create-event'
import { getAttendeeBadge } from './routes/get-attendee-badge'
import { getEvent } from './routes/get-event'
import { getEventAttendees } from './routes/get-event-attendees'
import { registerForEvent } from './routes/register-for-event'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*'
})

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'pass.in API',
      description:
        'API specifications for the pass.in API application backend.',
      version: '1.0.0',
      contact: {
        email: 'cleilsonjose@hotmail.com',
        name: 'Cleilson Andrade',
        url: 'https://www.linkedin.com/in/cleilson-andrade/'
      },
      license: {
        name: 'License',
        url: 'https://raw.githubusercontent.com/CleilsonAndrade/pass.in-api/main/LICENSE'
      }
    }
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(checkIn)
app.register(getEventAttendees)

app.setErrorHandler(errorHandler)

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3333

app
  .listen({
    port,
    host: '0.0.0.0'
  })
  .then(() => {
    console.log(`Server running: \nhttp://localhost:${port}`)
  })
