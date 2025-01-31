const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')
const jwt = require('jwt')

const { User } = db

router.post('/', async (req, res) => {
    let user = await User.findOne({
        where: { email: req.body.email }
    })

    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({
            message: 'could not find a user with the provided username and password'
        })
    } else {
        const result = await jwt.encode(process.env.JWT_SECRET, { id: user.userId })
        res.json({user: user, token: result.value })
    }
    console.log('IN HERE')
})

___
router.get('/profile', async (req, res) => {
    try {
        let user = await User.findOne({
            where: {
                userId:  
            }
        })
        res.json(user)
    } catch {
        res.json(null)
    }
})

module.exports = router

