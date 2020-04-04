function createSubscriptionModel(conn) {
  const Subscription = conn.model('Subscription', {
    start: Date,
    end: Date,
  })

  return Subscription
}

module.exports = { createSubscriptionModel }
