import type { NextApiRequest, NextApiResponse } from 'next'

import { validateRoute } from '../../../../lib/auth'
import prisma from '../../../../lib/prisma'

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { price, items, name, size, description } = req.body
    try {
      const newMenu = await prisma.menu.create({
        data: {
          description,
          name,
          price,
          size,
          items: {
            create: {
              ...items,
            },
          },
        },
      })
      res.status(201).json(newMenu)
    } catch (e) {
      res.status(401).json(e)
    }
  }
)
