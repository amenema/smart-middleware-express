'use strict';
/**
 * Created by menzhongxin on 2016/11/24.
 */
const path = require('path')
const _ = require('lodash')
const utils = require('./utils')
const base = require('./router')
let dirPath = path.join(__dirname, '../../../api')
let len = 0

let dealFile = file => {
    let router = require(file)
    router(base)
}

let load = (path, options) => {
    let file = []
    let dir = []
    let {ignore, target} = options
    utils.load(path, rs => {
        _.each(rs, c => {
            if(_.find(ignore, c) < 0){
                if(utils.isDir(c, path)){
                    dir.push(path + '/' + c)
                }else if(c === target || target === undefined){
                    file.push(path + '/' + c)
                }
            }
        })
        _.each(dir, c => {
            load(c, options)
        })
        _.each(file, c=> {
            dealFile(c)
        })
    })
}

let init = exports.init = (path, options = {ignore: [], target: undefined, middleware: []}) => {
    base.init(options.middleware)
    load(path, options)
}
