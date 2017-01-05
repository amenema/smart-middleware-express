"use strict"
/**
 * Created by menzhongxin on 2016/11/27.
 */
const _ = require('lodash')
const METHOD = ['get', 'post', 'put', 'delete']
let Router = function(){}
module.exports = new Router()

let insertBefore = (args, before) => {
    _.isFunction(before) && (before = [before])
    let i = 1
    _.each(before, c => {
        args.splice(i++, 0, c);
    })
}
let insertAfter = (args, after, afterLen) => {
    _.isFunction(after) && (after = [after])
    _.each(after, c => {
        args.splice(args.length - afterLen, 0, c);
    })
}

let match = (url, rule, isWhiteList) => {
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
    return isWhiteList === rs
}

let dealMethod = (args, method, options)=> {
    let url = args[0]
    let router = options.router
    let rules = options.rules||[]
    let len = rules.length
    let isWhiteList = false
    let afterLen = 0
    let middleware, before, after, rule
    while(len > 0){
        middleware = rules[--len]
      !!middleware.whiteList && (isWhiteList = true)
        rule = middleware.whiteList||middleware.blacklist||[]
        before = middleware.before ||[]
        after = middleware.after||[]
        if(match(url, rule, isWhiteList)){
            insertBefore(args, before)
            insertAfter(args, after, afterLen)
            afterLen += after.length
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

