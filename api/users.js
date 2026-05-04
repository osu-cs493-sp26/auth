import { Router } from 'express'
import bcrypt from 'bcryptjs'

import prisma from '../lib/prisma.js'

const router = Router()

router.post('/', async (req, res, next) => {
    const { email, password } = req.body
    const hash = await bcrypt.hash(password, 10)
    console.log(hash)
    const user = await prisma.user.create({
        data:{
            email: email,
            password: hash
        }
    })
    res.status(201).send({ id: user.id })
})

router.get('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id)
    const user = await prisma.user.findUnique({
        where: { id: id },
        omit: { password: true }
    })
    if (user) {
        res.status(200).send(user)
    } else {
        next()
    }
})

router.post("/login", async (req, res, next) => {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({
        where: { email: email }
    })
    const authenticated = user && await bcrypt.compare(password, user.password)
    if (authenticated) {
        res.status(200).send({})
    } else {
        res.status(401).send({
            err: "Credentials are invalid"
        })
    }
})

export default router
