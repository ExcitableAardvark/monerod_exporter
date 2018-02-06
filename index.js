/*
 * Copyright 2018 Excitable Aardvark <excitableaardvark@tutanota.de>
 *
 * Licensed under the 3-Clause BSD license. See LICENSE in the project root for
 * more information.
 */

const Daemon = require('monero-rpc').Daemon
const express = require('express')
const prometheus = require('prom-client')

const DAEMON_HOST = process.env.DAEMON_HOST || 'http://localhost:18081'
const PORT = process.env.PORT || 9396
const Gauge = prometheus.Gauge

const app = express()
const daemon = new Daemon(DAEMON_HOST)

const incomingConnections = new Gauge({ name: 'monerod_connections_incoming', help: 'Number of incoming connections' })
const outgoingConnections = new Gauge({ name: 'monerod_connections_outgoing', help: 'Number of outgoing connections' })
const mempoolSize = new Gauge({ name: 'monerod_mempool_size', help: 'Number of transactions in the mempool' })

app.get('/metrics', (req, res) => {
  console.log('.')

  daemon.getInfo((err, info) => {
    if (err) return console.log(err)

    incomingConnections.set(Number(info.incoming_connections_count))
    outgoingConnections.set(Number(info.outgoing_connections_count))
    mempoolSize.set(Number(info.tx_pool_size))

    res.end(prometheus.register.metrics())
  })
})

app.listen(PORT, () => console.log(`Listening on :${PORT}`))
