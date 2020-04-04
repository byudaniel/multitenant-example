const initializeTenantModels = require('../models')

const mongoConnections = [
  {
    tenantId: 't1',
    connectionString: 'mongodb://localhost:32768/tenant1',
  },
  {
    tenantId: 't2',
    connectionString: 'mongodb://localhost:32769/tenant2',
  },
]

module.exports = {
  name: 'mongoose-models',
  version: '0.1.0',
  register: async function (server, options) {
    const tenantModels = await initializeTenantModels(mongoConnections)
    server.decorate('server', 'tenantModels', tenantModels)
  },
}
