const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  })

  await server.register(require('./plugins/tenantModels'))
  await server.register({
    plugin: require('hapi-tenants'),
    options: {
      tenantResources: {
        models: (tenantId) => server.tenantModels[tenantId],
      },
    },
  })

  server.route({
    method: 'POST',
    path: '/save',
    handler: async (request, h) => {
      const { Subscription } = request.tenantStore.get('models')
      const newSub = new Subscription()
      newSub.start = new Date()
      newSub.end = new Date()
      await newSub.save()

      return 'Subscription saved'
    },
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

init()
