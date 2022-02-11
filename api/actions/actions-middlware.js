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

function validateAction(req, res, next) {
    if(!req.body.project_id || !req.body.description || !req.body.notes){
        res.status(400).json({ message: 'project_id, description, and notes are required' }) 
        } else{
            next()
        }
    }

function validateCompleted(req, res, next) {
    if(req.body.completed !== true && req.body.completed !== false){
        res.status(400).json({ message: 'figure it out' })
    } else {
        next();
    }
}

module.exports = {
    validateActionId,
    validateAction,
    validateCompleted,
}