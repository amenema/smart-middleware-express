'use strict'
/**
 * Created by menzhongxin on 2016/11/28.
 */
exports.rules = [
    {
        conform: '/api/index',
        before: [(req, res, next) => {
            req.before = '_b_1'
            next()
        }, (req, res, next) => {
            req.before += '_b_2'
            next()
        }],
        after: [
            (req, res, next) => {
                req.after += '_a_1'
                let rs = req.before + req.current + req.after
                res.json(rs)
            },
            (req, res, next) => {
                req.after += '_a_2'
                next()
            }
        ]
    },
    {
        conform: /\/api/,
        before: [ (req, res, next) => {
            req.before += '_b_3'
            next()
        }, (req, res, next) => {
            req.before += '_b_4'
            next()
        }],
        after: [(req, res, next) => {
            req.after += '_a_3'
            next()
        },
            (req, res, next) => {
                req.after = '_a_4'
                next()
            }

        ]
    }
]
