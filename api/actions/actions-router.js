// Write your "actions" router here!
const express = require('express');

const {
    validateActionId,
    validateAction,
    validateCompleted
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

router.post('/', validateAction, (req, res, next) => {
    Actions.insert(req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(next)
})

router.put('/:id', validateActionId, validateAction, validateCompleted, (req, res, next) => {
    Actions.update(req.params.id, req.body)
    .then(updateProject => {
        res.status(200).json(updateProject)
    }) .catch(next)
})

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        await Actions.remove(req.action.id)
        res.status(200).json(req.action.id)
    } catch(err) {
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