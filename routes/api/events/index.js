'use strict'

/**
 *
 * @param {import('fastify'.FastifyInstance)} app
 */

const { default: fastify } = require('fastify')

let currentId = 2

const posts = [
  {
    id: 1,
    user: 'John Doe',
    title: 'Hello World'
  }
]

const postOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['user', 'title'],
      properties: {
        title: { type: 'string' },
        user: { type: 'string' }
      }
    },
    response: {
      201: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          user: { type: 'string' }
        }
      }
    }
  }
}

module.exports = async function (app, opts) {
  // Read
  app.get('/', async function (request, reply) {
    reply.status(200).send(posts)
  })

  // Post
  app.post('/', postOptions, async function (request, reply) {
    const { title, user } = request.body
    const newPost = { id: currentId, title, user }

    posts.push(newPost)
    currentId++
    reply.code(201)
    return newPost
  })

  // Read
  app.get('/:id', async function (request, reply) {
    try {
      const post = posts.find((p) => p.id === +request.params.id)
      if (!post) {
        return app.httpErrors.notFound('Post not found')
      }
      return post
    } catch (err) {
      throw new Error(err)
    }
  })
}
