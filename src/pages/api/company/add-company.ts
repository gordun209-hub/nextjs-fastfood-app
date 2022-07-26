import type { User } from '@prisma/client'
import prisma from '@utils/db'
import type { NextApiRequest, NextApiResponse } from 'next'

import { validateRoute } from '../../../../lib/auth'

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: User) => {
    const {
      region,
      currency,
      name,
    }: {
      region: string
      currency: string
      name: string
    } = req.body
    try {
      const createdCompany = await prisma.company.create({
        data: {
          name: name,
          region: region,
          currency: currency,
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
