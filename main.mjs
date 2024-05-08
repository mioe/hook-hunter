import Fastify from 'fastify'
const fastify = Fastify({
	logger: {
		transport: {
			target: 'pino-pretty',
			options: {
				destination: 1,
				colorize: true,
				translateTime: 'mm-dd-yy HH:MM:ss Z',
				ignore: 'pid,hostname',
			},
		},
	},
})

fastify.post(
	'/webhook',
	async function handler(request, reply) {
		fastify.log.warn(request.body)
		reply.send('success')
	},
)

try {
	await fastify.listen({ port: 3000 })
} catch (err) {
	fastify.log.error(err)
	process.exit(1)
}

