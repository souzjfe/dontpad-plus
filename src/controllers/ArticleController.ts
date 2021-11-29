import { NextApiRequest } from 'next'
import ArticleRepository from '../repositories/ArticleRepository'
import { NextApiResponseServerIO } from '../types/next'

class articleController {
  async findAll(req: NextApiRequest, res: NextApiResponseServerIO) {
    const articles = await ArticleRepository.findAll()

    return res.json(articles)
  }

  async findByTitle(req: NextApiRequest, res: NextApiResponseServerIO) {
    let title = req.query.title
    
    if (typeof title !== "string" ){
      title = title[0]
    }
    const article = await ArticleRepository.findByTitle(title)

    if (!article) return res.json({ error: 'article not found' })

    return res.json(article)
  }

  async create(req: NextApiRequest, res: NextApiResponseServerIO) {
    const article = await ArticleRepository.create(req.body)

    return res.json(article)
  }

  async delete(req: NextApiRequest, res: NextApiResponseServerIO) {
    let title = req.query.title

    if (typeof title !== "string" ){
      title = title[0]
    }

    if (!(await ArticleRepository.findByTitle(title))) {
      return res.json({ error: 'article not found' })
    }

    await ArticleRepository.delete(title)

    return res.json({ message: 'ok' })
  }

  async update(req: NextApiRequest, res: NextApiResponseServerIO) {
    let title = req.query.title
    
    if (typeof title !== "string" ){
      title = title[0]
    }

    if (!(await ArticleRepository.findByTitle(title)))
      return res.json({ error: 'article not found' })

    const article = await ArticleRepository.update(title, req.body)

    return res.json(article)
  }
}

export default new articleController()
