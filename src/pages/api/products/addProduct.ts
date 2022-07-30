import type { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { validateRoute } from '../../../../lib/auth'
import prisma from '../../../../lib/prisma'

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: User) => {
    const {
      name,
      price2,
      categoryName,
    }: {
      name: string

      price2: number
      categoryName: string
    } = req.body
    console.log(req.body)
    try {
      const company = await prisma.company.findUnique({
        where: {
          id: user.id,
        },
      })
      if (company) {
        const createdProduct = await prisma.product.create({
          data: {
            price: price2,
            name: name,
            Company: {
              connect: {
                id: company?.id,
              },
            },
            category: {
              connect: {
                name: categoryName,
              },
            },
          },
        })
        res.status(201).json({ createdProduct })
      }
    } catch (e) {
      res.status(404).json({ e })
    }
  }
)
