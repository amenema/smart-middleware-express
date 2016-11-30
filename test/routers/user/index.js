/**
 * Created by menzhongxin on 2016/11/29.
 */
module.exports = function(router){
  router.get('/api/user/index', (req, res, next) => {
    res.json('index.js')
  })

  router.get('/api/user/info', (req, res, next) => {
    res.json({name: 'smart-middleware', tag: 'express'})
    next()
  })

}
