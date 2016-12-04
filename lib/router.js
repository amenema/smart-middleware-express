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

let match = (url, rule, isConform) => {
    !_.isArray(rule) && (rule = [rule])
    let rs = false
    for(let i = 0; i < rule.length; i++){
        if(rule[i] instanceof  RegExp){
            rs =  rule[i].test(url)
        }else{
            rs = rule[i] === url
        }
        if(rs)
          break
    }
    return isConform === rs
}

let dealMethod = (args, method, options)=> {
    let url = args[0]
    let router = options.router
    let rules = options.rules||[]
    let len = rules.length
    let isConform = true
    let middleware, before, after, rule
    let insertPoint = 0
    while(len > 0){
        len -= 1
        middleware = rules[len]
        !!middleware.unless && (isConform = false)
        rule = middleware.conform||middleware.unless||[]
        before = middleware.before ||[]
        after = middleware.after||[]
        if(match(url, rule, isConform)){
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

