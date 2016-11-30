'use strict'
/**
 * Created by menzhongxin on 2016/11/28.
 */
module.exports = function(router){
  router.get('/api/index', (req, res, next) => {
    req.current = '_c_index'
    next()
  })

  router.get('/api/login', (req, res, next) => {
    req.current = '_c_login'
    next()
  })

}
