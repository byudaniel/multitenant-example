const mongoose = require('mongoose')
const { createSubscriptionModel } = require('./Subscription')

async function initializeTenantModels(tenantConnections) {
  const tenantModels = {}

  for (const connectionConfig of tenantConnections) {
    const conn = mongoose.createConnection(connectionConfig.connectionString)

    tenantModels[connectionConfig.tenantId] = {
      Subscription: createSubscriptionModel(conn),
    }
  }

  return tenantModels
}

module.exports = initializeTenantModels
