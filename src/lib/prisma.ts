import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  // Explicitly passing the URL to satisfy Vercel's build process
  return new PrismaClient({
    datasourceUrl: process.env.PRISMA_DATABASE_URL || process.env.DATABASE_URL
  } as any)
}

declare global {
  var prismaGlobal2: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal2 ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal2 = prisma
