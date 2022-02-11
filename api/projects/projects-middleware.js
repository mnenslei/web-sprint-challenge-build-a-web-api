// add middlewares here related to projects

const Projects = require('./projects-model')

async function validateProjectId(req, res, next) {
    try {
        const promise = await Projects.get(req.params.id)
        if(!promise) {
            res.status(404).json({ message: 'project not found' })
        } else {
            req.project = promise
            next()
        }
    } catch(err) {
        res.status(500).json({ message: 'it broke' })
    }
}

function validatePost(req, res, next) {
    if(req.body.name && req.body.description){
        next()
    } else{
        res.status(400).json({
            message: 'name and description are required'
        })
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
    validateProjectId,
    validatePost,
    validateCompleted,
}