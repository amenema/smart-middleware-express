"use strict"
/**
 * Created by menzhongxin on 2016/11/27.
 */
const _ = require('lodash')
const METHOD = ['get', 'post', 'put', 'delte']
let Router = function () => {}
module.exports = new Router()

let insertBefore = (args, before) => {
    _.isFunction(before) && (before = [before])
    _.each(before, c => {
        args.splice(i + 1, 0, c);
    })
}
let insertAfter = (args, after) => {
    _.isFunction(after) && (after = [after])
    _.each(after, c => {
        args.push(c)
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
    let {router, middlewares } = options
    let len = middlewares.length
    let middleware, before, after, rule
    while(len > 0){
        len -= 1
        middleware = middlewares[len]
        rule = middleware.rule
        before = middleware.before ||[]
        after = middleware.after||[]
        match(url, rule) && insertBefore(args, before), insertAfter(args, after)
        router[method].apply(router, args)
    }
}

Router.prototype.init = (options) => {
    METHOD.forEach(c => {
        dealMethod(Array.prototype.slice.call(arguments), method, options)
    })
}
