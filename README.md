# monerod_exporter
> Monero Prometheus exporter

### Environment Variables

* `DAEMON_HOST` - monerod host, default: `http://localhost:18081`
* `PORT` - port to expose metrics on, default: `9396`

### Metrics Exported

* `monerod_connections_incoming` - Number of incoming connections
* `monerod_connections_outgoing` - Number of outgoing connections
* `monerod_tx_mempool` - Number of transactions in the mempool
* `monerod_tx_chain` - Number of transactions in total

### Pretty Screenshots

You can use Grafana to create a dashboard to show everyone how cool you are.

![Grafana Screenshot](https://i.imgur.com/2rqyOcY.png)

### License

Released under the terms of the 3-Clause BSD License. See `LICENSE` for more
information.
