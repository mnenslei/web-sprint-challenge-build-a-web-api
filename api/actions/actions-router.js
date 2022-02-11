// Write your "actions" router here!
const express = require('express');

const {
    validateActionId
} = require('./actions-middlware')

const Actions = require('./actions-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Actions.get()
    .then(actions => {
        res.json(actions)
    })
    .catch(next)
})

router.get('/:id', validateActionId, async (req, res, next) => {
    try { 
        const action = await Actions.get(req.action.id)
        res.status(200).json(action)
    } catch (err){
        next(err)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = router