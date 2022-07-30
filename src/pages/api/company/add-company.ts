import type { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { validateRoute } from '../../../../lib/auth'
import prisma from '../../../../lib/prisma'

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: User) => {
    const {
      name,
    }: {
      name: string
    } = req.body
    try {
      const createdCompany = await prisma.company.create({
        data: {
          name: name,
          user: {
            connect: {
              email: user.email,
            },
          },
        },
      })

      res.status(201).json({ createdCompany })
    } catch (e) {
      res.status(401).json({ error: 'error while trying to create company' })
    }
  }
)
