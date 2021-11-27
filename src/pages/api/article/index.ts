import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


// POST /api/article
// Required fields in body: title, authorEmail
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content } = req.body
  const result = await prisma.article.create({
    data: {
      title: title,
      content: content,
    },
  })
  res.json(result)
}
