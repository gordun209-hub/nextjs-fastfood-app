import type { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { validateRoute } from '../../../../lib/auth'
import prisma from '../../../../lib/prisma'

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: User) => {
    const company = await prisma.company.findUnique({
      where: {
        userId: user.id,
      },
    })
    try {
      const categories = await prisma.company.findMany({
        select: {
          categories: true,
        },
        where: {
          id: company?.id,
        },
      })

      res.status(201).json(categories)
    } catch (e) {
      res.status(401).json({ error: 'error while trying to create company' })
    }
  }
)
