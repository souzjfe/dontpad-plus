import prisma from '../lib/prisma'

class UserRepository {
  findAll() {
    return prisma.article.findMany()
  }
  findByTitle(title: string) {
    return prisma.article.findUnique({
      where: {
        title,
      },
    })
  }
  create(article) {
    return prisma.article.create({
      data: article,
    })
  }
  delete(title: string) {
    return prisma.article.delete({
      where: {
        title,
      },
    })
  }
  update(title: string, user) {
    return prisma.article.update({
      where: {
        title,
      },
      data: user,
    })
  }
}

export default new UserRepository()
