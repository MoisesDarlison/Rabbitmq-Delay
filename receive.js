const amqp = require("amqplib/callback_api")

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) throw error0

  connection.createChannel(function (error1, channel) {
    if (error1) throw error1

    const queue = "jobsWithDelay"
    channel.assertQueue(queue, { durable: true })

    console.log("-> Waiting for messages in queue:", queue)
    channel.consume(
      queue,
      function (msg) {
        let time = new Date().toLocaleTimeString()
        console.log(`Message receive on ${time} - ${msg.content.toString()}`)
      },
      { noAck: true }
    )
  })
})
