import bcrypt from 'bcrypt'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../../lib/prisma'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body

  const foundUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
    const token = jwt.sign(foundUser, process.env.JWT_SECRET as string, {
      expiresIn: '8h',
    })

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('ACCESS_TOKEN', token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
    )

    return res.status(200).json(foundUser)
  }

  return res.status(404).send({ msg: 'Invalid credentials!' })
}
