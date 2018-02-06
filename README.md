# monerod_exporter
> Monero Prometheus exporter

### Environment Variables

* `DAEMON_HOST` - monerod host, example: `http://localhost:18081`
* `PORT` - port to expose metrics on

### Metrics Exported

* `monerod_connections_incoming` - Number of incoming connections
* `monerod_connections_outgoing` - Number of outgoing connections
* `monerod_mempool_size` - Number of transactions in the mempool

### License

Released under the terms of the 3-Clause BSD License. See `LICENSE` for more
information.
