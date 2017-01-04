'use strict'
/**
 * Created by menzhongxin on 2016/11/28.
 */
exports.rules = [
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
