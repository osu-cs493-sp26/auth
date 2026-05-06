import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const secret = process.env.JWT_SECRET

export function generateAuthToken(id) {
    const payload = { sub: id }
    return jwt.sign(payload, secret, { expiresIn: "24h" })
}

export function requireAuthentication(req, res, next) {
    /*
     * Authorization: Bearer <token>
     */
    const authHeader = req.get("Authorization") || ""
    const authHeaderParts = authHeader.split(" ")
    const token = authHeaderParts[0] === "Bearer"
        ? authHeaderParts[1] : null

    jwt.verify(token, secret, (err, payload) => {
        if (err) {
            res.status(401).send({
                err: "Invalid auth token"
            })
        } else {
            req.user = payload.sub
            next()
        }
    })
}
