import { NextApiRequest } from 'next'
import ArticleController from '../../../controllers/ArticleController'
import { NextApiResponseServerIO } from '../../../types/next'

export default function Handle(
  req: NextApiRequest,
  res: NextApiResponseServerIO
): void {
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
    externalResolver: true
  }
}
