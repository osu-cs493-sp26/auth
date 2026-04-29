import { Router } from 'express'

const router = Router()

router.post('/', (req, res, next) => {
    res.status(201).send({})
})

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    res.status(200).send({})
})

export default router
