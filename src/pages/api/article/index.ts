import type { NextApiRequest, NextApiResponse } from 'next'
import ArticleController from '../../../controllers/ArticleController'
import prisma from '../../../lib/prisma'


export default function Handle(req, res) {
  switch (req.method) {
    case 'GET':
      ArticleController.findAll(req, res)
    break
    case 'POST':
      ArticleController.create(req, res)
    break
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}