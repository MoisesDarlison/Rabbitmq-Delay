const amqp = require("amqplib/callback_api")
let amqpConn = null

function start() {
  //Change RabbitMQ server path here "amqp://localhost"
  amqp.connect("amqp://localhost?heartbeat=60", function (err, conn) {
    if (err) {
      console.error("[AMQP]", err.message)
      return setTimeout(start, 1000)
    }

    conn.on("error", function (err) {
      if (err.message !== "Connection closing") {
        console.error("[AMQP] conn error", err.message)
      }
    })

    conn.on("close", function () {
      console.error("[AMQP] reconnecting")
      return setTimeout(start, 1000)
    })

    console.log("[AMQP] connected")
    amqpConn = conn
    whenConnected()
  })
}

function whenConnected() {
  startPublisher()
  startWorker()
}

let pubChannel = null
const offlinePubQueue = []
const exchange = "your-delay-exchange"

function startPublisher() {
  amqpConn.createConfirmChannel(function (err, ch) {
    if (closeOnErr(err)) return
    ch.on("error", function (err) {
      console.error("[AMQP] channel error", err.message)
    })
    ch.on("close", function () {
      console.log("[AMQP] channel closed")
    })
    pubChannel = ch
    //assert the exchange: 'my-delay-exchange' to be a x-delayed-message,
    pubChannel.assertExchange(exchange, "x-delayed-message", {
      autoDelete: false,
      durable: true,
      passive: true,
      arguments: { "x-delayed-type": "direct" },
    })
    //Bind the queue: "jobs" to the exchnage: "my-delay-exchange" with the binding key "jobs"
    pubChannel.bindQueue("jobsWithDelay", exchange, "jobsWithDelay")

    while (true) {
      const m = offlinePubQueue.shift()
      if (!m) break
      publish(m[0], m[1], m[2])
    }
  })
}

function publish(routingKey, content, delay) {
  try {
    pubChannel.publish(
      exchange,
      routingKey,
      content,
      { headers: { "x-delay": delay } },
      function (err, ok) {
        if (err) {
          console.error("[AMQP] publish", err)
          offlinePubQueue.push([exchange, routingKey, content])
          pubChannel.connection.close()
        }
      }
    )
  } catch (e) {
    console.error("[AMQP] failed", e.message)
    offlinePubQueue.push([routingKey, content, delay])
  }
}

// A worker that acks messages only if processed successfully
function startWorker() {
  amqpConn.createChannel(function (err, ch) {
    if (closeOnErr(err)) return
    ch.on("error", function (err) {
      console.error("[AMQP] channel error", err.message)
    })
    ch.on("close", function () {
      console.log("[AMQP] channel closed")
    })

    ch.prefetch(10)
    ch.assertQueue("jobsWithDelay", { durable: true }, function (err, _ok) {
      if (closeOnErr(err)) return
      console.log("Worker is started")
    })
  })
}

function closeOnErr(err) {
  if (!err) return false
  console.error("[AMQP] error", err)
  amqpConn.close()
  return true
}

//Publish a message every 10 second. But the message will be delayed different time
let count = 1
setInterval(function () {
  let delay = 20000 * count
  let time = new Date().toLocaleTimeString()
  console.log(`Send message number: ${count} on ${time} with delay of ${delay}ms`)
  publish("jobsWithDelay", new Buffer.from(`Initial Delay ${delay} sent to ${time}`), delay)

  count++
}, 10000)

start()
