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

  if (!foundUser) {
    const newUser = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, 10),
      },
    })

    const token = jwt.sign(newUser, process.env.JWT_SECRET as string, {
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

    return res.status(200).json({ ...newUser })
  }

  return res.status(500).json({ msg: 'User already exists!' })
}
