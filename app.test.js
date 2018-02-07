/*
 * Copyright 2018 Excitable Aardvark <excitableaardvark@tutanota.de>
 *
 * Licensed under the 3-Clause BSD license. See LICENSE in the project root for
 * more information.
 */

/* eslint-env jest */

const rewire = require('rewire')
const request = require('supertest')

const app = rewire('./app.js')

beforeEach(() => {
  // mock getInfo
  app.__set__('getInfo', () => {
    return new Promise(resolve => {
      resolve({
        'alt_blocks_count': 5,
        'difficulty': 972165250,
        'grey_peerlist_size': 2280,
        'height': 993145,
        'incoming_connections_count': 20,
        'outgoing_connections_count': 8,
        'status': 'OK',
        'target': 60,
        'target_height': 993137,
        'testnet': false,
        'top_block_hash': '',
        'tx_count': 564287,
        'tx_pool_size': 45,
        'white_peerlist_size': 529
      })
    })
  })

  // mock getLastBlockHeader
  app.__set__('getLastBlockHeader', () => {
    return new Promise(resolve => {
      resolve({
        'depth': 0,
        'difficulty': 746963928,
        'hash': 'ac0f1e2262...',
        'height': 990793,
        'major_version': 1,
        'minor_version': 1,
        'nonce': 1550,
        'orphan_status': false,
        'prev_hash': '386575e3b0...',
        'reward': 6856609225169,
        'timestamp': 1457589942
      })
    })
  })
})

describe('metrics endpoint', () => {
  test('it has a status code of 200', () => {
    return request(app)
      .get('/metrics')
      .then(response => {
        expect(response.statusCode).toBe(200)
      })
  })

  test('it contains the difficulty', () => {
    return request(app)
      .get('/metrics')
      .then(response => {
        expect(response.text).toContain('monerod_block_difficulty 746963928')
      })
  })

  test('it contains the number of incoming connections', () => {
    return request(app)
      .get('/metrics')
      .then(response => {
        expect(response.text).toContain('monerod_connections_incoming 20')
      })
  })

  test('it contains the number of transactions in the mempool', () => {
    return request(app)
      .get('/metrics')
      .then(response => {
        expect(response.text).toContain('monerod_tx_mempool 45')
      })
  })

  test('it contains the number of outgoing connections', () => {
    return request(app)
      .get('/metrics')
      .then(response => {
        expect(response.text).toContain('monerod_connections_outgoing 8')
      })
  })

  test('it contains the last block reward', () => {
    return request(app)
      .get('/metrics')
      .then(response => {
        expect(response.text).toContain('monerod_block_reward 6.856609225169')
      })
  })

  test('it contains the number of transactions on the chain', () => {
    return request(app)
      .get('/metrics')
      .then(response => {
        expect(response.text).toContain('monerod_tx_chain 564287')
      })
  })
})
