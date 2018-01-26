const jwt = require('jsonwebtoken')
const env = require('../.env')

module.exports = (req, res, next) => {

    // CORS preflight request
    if(req.method === 'OPTIONS') {
        next()
    } else {
        const token = req.body.token || req.query.token || req.headers['authorization']

        if(!token) {
            return res.status(403).send({err: 'erro'})
        }

        jwt.verify(token, env.secret, function(err, decoded) {
            if(err) {
                return res.status(403).send({err:
                    "error"
                })
            } else {
                req.decoded = decoded
                next()
            }
        })
    }
}
