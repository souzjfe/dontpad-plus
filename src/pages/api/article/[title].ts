import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { NextApiResponseServerIO } from '../../../types/next'


export default async function handle(req: NextApiRequest, res: NextApiResponseServerIO) {
  let articleTitle = req.query.title
  if (typeof articleTitle !== "string" ){
    articleTitle = articleTitle[0]
  }
  if (req.method === 'GET') {
    handleGET(articleTitle, res)
  } else if (req.method === 'DELETE') {
    handleDELETE(articleTitle, res)
  } else if (req.method === 'PUT') {
    handlePUT(articleTitle, res, req.body)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// PUT /api/artcile/:title
async function handlePUT(articleTitle: string, res: NextApiResponseServerIO,data: JSON) {
  const article = await prisma.article.update({
    where: { title: articleTitle },
    data,
  })
  // dispatch to channel "article"
  res?.socket?.server?.io?.emit(articleTitle, article);
  // return article
  res.status(201).json(article);
  
}
// GET /api/article/:title
async function handleGET(articleTitle: string, res:NextApiResponse) {
  const article = await prisma.article.findUnique({
    where: { title: articleTitle },
  })
  res.status(201).json(article);
}

// DELETE /api/artcile/:title
async function handleDELETE(articleTitle: string, res:NextApiResponse) {
  const article = await prisma.article.delete({
    where: { title: String(articleTitle) },
  })
  res.status(201).json(article);
}
