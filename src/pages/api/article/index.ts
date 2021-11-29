import ArticleController from '../../../controllers/ArticleController'

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
    externalResolver: true
  }
}
