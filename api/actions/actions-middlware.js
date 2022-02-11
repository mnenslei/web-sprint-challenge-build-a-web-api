// add middlewares here related to actions
const Actions = require('./actions-model')

async function validateActionId(req, res, next) {
    try {
        const promise = await Actions.get(req.params.id)
        if(!promise) {
            res.status(404).json({ message: 'action not found' })
        } else {
            req.action = promise
            next()
        }
    } catch(err) {
        res.status(500).json({ message: 'it broke' })
    }
}

module.exports = {
    validateActionId,
}