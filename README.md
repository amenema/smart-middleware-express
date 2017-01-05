# smart-middleware

[![Travis](https://img.shields.io/badge/npm-1.0.0-brightgreen.svg?style=flat-square)](https://www.npmjs.com/package/smart-middleware-express)
[![Build Status](https://travis-ci.org/amenema/smart-middleware-express.svg?branch=master)](https://travis-ci.org/amenema/smart-middleware-express)
[![Coverage Status](https://coveralls.io/repos/github/amenema/smart-middleware-express/badge.svg?branch=master)](https://coveralls.io/github/amenema/smart-middleware-express?branch=master)
[![npm](https://img.shields.io/npm/l/express.svg?style=flat-square)](https://github.com/amenema/smart-middleware-express/https://github.com/amenema/smart-middleware-express/blob/master/LICENSE)
 
 Router middleware for [Express](http://www.expressjs.com.cn/).

> feedbacks are welcome


[cn api click here](http://menzhongxin.com/2016/11/17/smart-middleware-express/)
## Features
* auto loading router
* auto matching middleware by config 

## Installation
install with [npm](https://www.npmjs.com/package/smart-middleware-express)
```
npm install smart-middleware-express
```

## Usage
```
/*step 1 app.js*/
const path = require('path')
const express = require('express')
const sm = require('smart-middleware-express')
const app = express()
const router = express.Router()
const url = './routers'
const rules = [
    {
        whiteList: '/api/index',
        before: [function b_1(req, res, next) {
            req.before = '_b_1'
            next()
        }, function b_2 (req, res, next) {
            req.before += '_b_2'
            next()
        }],
        after: [
            function a_1(req, res, next){
                req.after = '_a_1'
                next()
            },
            function a_2(req, res, next) {
                req.after += '_a_2'
                next()
        }
        ]
    },
    {
        whiteList: /\/api/,
        before: [ function b_3(req, res, next){
            req.before += '_b_3'
            next()
        }, function b_4(req, res, next){
            req.before += '_b_4'
            next()
        }],
        after: [ function a_3(req, res, next){
            req.after += '_a_3'
            next()
        },
            function a_4(req, res, next){
                req.after += '_a_4'
                next()
            }

        ]
    },
  {
    whiteList: '/api/index',
    before: [function b_5(req, res, next) {
      req.before += '_b_5'
      next()
    }]
  },
  {
    whiteList: '/api/index',
    after: [function a_5(req, res, next) {
        req.after += '_a_5'
        next()
    }, function a_6(req, res, next){
      req.after += '_a_6'
      next()
    }]
  },
  {
      whiteList: '/api/index',
    after: [function a_7(req, res) {
      req.after += '_a_7'
      let rs = req.before + req.current + req.after
      res.json(rs)
    }]
  }
]
sm.autoLoading(path.join(__dirname, url), {rules: rules, ignore: [], router: router})
app.use(router);


/*step 2 /routers/index.js*/
module.exports = function(router){
  router.get('/api/index', (req, res, next) => {
      req.current = '_c_index'
      next()
    })
  
  router.get('/api/login', (req, res, next) => {
      req.current = '_c_login'
      next()
  })
};
```

* when you visit the '**/api/index**' url, the response body is **\_b_1_b_2_b_3_b_4_b_5_c_index_a_1_a_2_a_3_a_4_a_5_a_6_a_7*


## Test
```
npm test
```

## Support
If you have any problem or suggestion please open an [issue](https://github.com/amenema/smart-middleware-express/issues) here.
