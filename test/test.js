'use strict'
/**
 * Created by menzhongxin on 2016/11/24.
 */
const express = require('express')
const request = require('supertest')
const should = require('should')
const sm = require('../index')
const path = require('path')
const utils = require('../lib/utils')
const config = require('./config')
const url = './routers'
const app = express()
const router = express.Router()


describe('util test', () => {
  let routers,config,fakeUrl
  beforeEach( () => {
    routers = path.join(__dirname, '/routers')
    config = path.join(__dirname, './config.js')
    fakeUrl = path.join(__dirname, '/fake')
  })

  it('throw err', (done) => {
    utils.load('', (err, rs) => {
      err.message.should.be.equal("ENOENT: no such file or directory, scandir ''")
      done()
    })
  })

  it('exists', (done) => {
    utils.exists(routers).should.be.true()
    utils.exists(fakeUrl).should.be.false()
    done()
  })

  it('isDir', (done) => {
    utils.isDir(routers).should.be.true()
    utils.isDir(config).should.be.false()
    done()
  })

  it('isFile', (done) => {
    utils.isFile(routers).should.be.false()
    utils.isFile(config).should.be.true()
    done()
  })

  it('load a file', (done) => {
    utils.load(config, (err, rs) => {
      rs.length.should.be.equal(0)
      done()
    })
  })

  it('load a dir', (done) => {
    utils.load(routers, (err, rs) => {
      rs.length.should.be.equal(2)
      done()
    })
  })

})



describe('auto load', () => {
  let req = undefined
  beforeEach(() => {
    let ignore = path.join(__dirname + '/routers/user/index.js')
    sm.autoLoading(path.join(__dirname, url), {rules: config.rules, ignore: [ignore], router: router})
    app.use(router)
    req = request(app)
  })

  it('auto load before and after middleware', (done) => {
    req.get('/api/index')
      .expect(200)
      .end((err, rs) => {
        rs.body.should.be.equal('_b_1_b_2_b_3_b_4_c_index_a_4_a_3_a_2_a_1')
        done()
      })
  })

  it('/api/user/index' , (done) => {
    req.get('/api/user/index')
      .end((err, rs) => {
        rs.status.should.be.equal(200)
        rs.body.should.be.equal('user.js')
        done()
      })
  })

  it('ignore index', (done) => {
    req.get('/api/user/info')
      .end((err, rs) => {
        rs.status.should.be.equal(404)
        rs.text.should.be.equal('Cannot GET /api/user/info\n')
        done()
      })
  })
})

