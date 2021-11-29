import type { NextApiRequest } from 'next'
import ArticleController from '../../../controllers/ArticleController'
import { NextApiResponseServerIO } from '../../../types/next'

export default function Handle(
  req: NextApiRequest,
  res: NextApiResponseServerIO
): void {
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
    externalResolver: true
  }
}
