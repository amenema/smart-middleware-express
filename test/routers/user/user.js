/**
 * Created by menzhongxin on 2016/11/29.
 */
module.exports = function(router){
  router.get('/api/user/index', (req, res, next) => {
    res.json('user.js')
  })

  router.get('/api/user/list', (req, res, next) => {
    next()
  })

}
