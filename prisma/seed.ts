
import { prisma } from '../src/lib/prisma'

async function seed() {
  await prisma.event.create({
    data: {
      id: '3a9f398d-1c50-4752-a363-2099d7fa00d5',
      title: 'Code-Event',
      slug: 'code-event',
      details: 'Um evento para desenvolvedores',
      maximumAttendees: 120,
    }
  })
}

seed().then(() => {
  prisma.$disconnect()
})