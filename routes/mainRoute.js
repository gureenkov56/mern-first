const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/test', getTest)

router.post('/test', postTest)


function getTest(req, res) {
    return res.status(200).json({message: 'GET OK 200', ...req.query})
}

function postTest(req, res) {
    return res.status(200).json({message: 'POST OK 200', ...req.body});
}

module.exports = router