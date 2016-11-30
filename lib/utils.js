'use strict';
/**
 *
 * Created by menzhongxin on 2016/11/24.
 */
let fs = require('fs')
let path = require('path')

let exists = exports.exists =  path => {
    return fs.existsSync(path)
}

let isDir = exports.isDir = (path, father) => {
    father = father||''
    return exists(father + '/' + path) && fs.statSync(father + '/' + path).isDirectory()
}

let isFile = exports.isFile = path => {
    return exists(path) && fs.statSync(path).isFile()
}

exports.load = (path, cb) => {
    if(!isDir(path)){
        cb([])
    }else{
        fs.readdir(path, (err, rs) => {
            if(err){
                throw err
            }else{
                cb(rs)
            }
        })
    }
}


