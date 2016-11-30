"use strict"
/**
 * Created by menzhongxin on 2016/11/27.
 */
const _ = require('lodash')
const METHOD = ['get', 'post', 'put', 'delte']
let Router = function(){}
module.exports = new Router()

let insertBefore = (args, before) => {
    _.isFunction(before) && (before = [before])
    let i = 1
    _.each(before, c => {
        args.splice(i++, 0, c);
    })
}
let insertAfter = (args, after, insertPoint) => {
    _.isFunction(after) && (after = [after])
    let i = 0
    _.each(after, c => {
        args.splice(args.length - i++, 0, c);
    })
}

let match = (url, rule) => {
    if(rule.indexOf('\\') == 0)
        return new RegExp(rule.substring(1), 'i').test(url)
    else
        return rule === url
}

let dealMethod = (args, method, options)=> {
    let url = args[0]
    let router = options.router
    let rules = options.rules||[]
    let len = rules.length
    let middleware, before, after, rule
    let insertPoint = 0
    while(len > 0){
        len -= 1
        middleware = rules[len]
        rule = middleware.rule
        before = middleware.before ||[]
        after = middleware.after||[]
        if(match(url, rule)){
            insertBefore(args, before)
            insertAfter(args, after, insertPoint)
            insertPoint = after.length
        }
    }
    router[method].apply(router, args)
}

Router.prototype.init = (options) => {
    METHOD.forEach(c => {
        Router.prototype[c] = function() {
            dealMethod(Array.prototype.slice.call(arguments), c, options)
        }
    })
}
