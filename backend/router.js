const router = require('express').Router();
const getInfo = require('./src/getTableInfo/getInfo');

router.get('/', (req, res) => {
  return res.send("Hello World")
});
router.get('/getInfo', getInfo.getUserDependencies);

module.exports = router;