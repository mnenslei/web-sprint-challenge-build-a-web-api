// Write your "projects" router here!
const express = require('express');

const {
    validateProjectId,
    validatePost,
    validateCompleted,
} = require('./projects-middleware')

const Projects = require('./projects-model')

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
    .then(projects => {
        res.json(projects)
    })
    .catch(next)
})

router.get('/:id', validateProjectId, async (req, res, next) => {
    try { 
        const project = await Projects.get(req.project.id)
        res.status(200).json(project)
    } catch (err){
        next(err)
    }
})

router.post('/', validatePost, (req, res, next) => {
    Projects.insert(req.body)
    .then(newProject => {
        res.status(201).json(newProject)
    })
    .catch(next)
});

router.put('/:id', validateProjectId, validatePost, validateCompleted, (req, res, next) => {
        Projects.update(req.params.id, req.body)
        .then(updateProject => {
            res.status(200).json(updateProject)
    }) .catch(next)
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Projects.remove(req.project.id)
        res.status(200).json(req.project.id)
    } catch(err) {
        next(err)
    }
})
   
router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const result = await Projects.getProjectActions(req.params.id)
        res.status(200).json(result)
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