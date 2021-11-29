import type { NextApiRequest, NextApiResponse } from 'next'
import ArticleController from '../../../controllers/ArticleController'
import prisma from '../../../lib/prisma'
import { NextApiResponseServerIO } from '../../../types/next'

export default function Handle(req, res) {
  switch (req.method) {
    case 'GET':
      ArticleController.findByTitle(req, res)
    break
  
    case 'PUT':
      ArticleController.update(req, res)
    break

    case 'DELETE':
      ArticleController.delete(req, res)
    break
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}