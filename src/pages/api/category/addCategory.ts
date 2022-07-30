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
    const { name }: { name: string } = req.body

    if (company) {
      try {
        const createdCategory = await prisma.category.create({
          data: {
            name,
            companies: {
              connect: {
                id: company.id,
              },
            },
          },
        })
        res.status(201).json({ createdCategory })
      } catch (e) {
        res.status(401).json({ error: 'error while trying to create company' })
      }
    } else {
      res.status(401).json({ error: 'cant find company' })
    }
  }
)
