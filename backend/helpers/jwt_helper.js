const jwt = require('jsonwebtoken');
const createError = require('http-errors')

const User = require('../models/user_model');

module.exports = {
    signAccessToken: (userid) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: '5hr',
                audience: userid
            }

            jwt.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message)
                    reject(createError.InternalServerError())
                }
                resolve(token)
            })
        })
    },
    verifyAccessToken: async (req, res, next) => {
        if (!req.headers['authorization'])
            return next(createError.Unauthorized());

        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                const message =
                    err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                return next(createError.Unauthorized(message))
            }
            req.payload = payload
            next()
        })
    },
    adminMiddleware: (req, res, next) => {
        const result = req.payload.aud;

        User.findById(req.payload.aud).then(result => {
            if (result.role !== "admin") {
                return res.status(400).json({ message: "Admin access denied" });
            }

            // console.log("The role is "+ result.role);
        });
        // console.log(req.payload.)
        // if (req.payload.name !== "admin") {
        //     return res.status(400).json({ message: "Admin access denied" });

        // }
        next();
    },

    // signRefreshToken: (userId) => {
    //     return new Promise((resolve, reject) => {
    //         const payload = {}
    //         const secret = process.env.REFRESH_TOKEN_SECRET
    //         const options = {
    //             expiresIn: '1y',
    //             audience: userId,
    //         }
    //         jwt.sign(payload, secret, options, (err, token) => {
    //             if (err) {
    //                 console.log(err.message)
    //                 reject(createError.InternalServerError())
    //                 return
    //             }
    //             resolve(token)

    //             // client.SET(userId, token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
    //             //     if (err) {
    //             //         console.log(err.message)
    //             //         reject(createError.InternalServerError())
    //             //         return
    //             //     }
    //             //     resolve(token)
    //             // })
    //         })
    //     })
    // },
    // verifyRefreshToken: async (refreshToken) => {
    //     return new Promise((resolve, reject) => {
    //         jwt.verify(
    //             refreshToken,
    //             process.env.REFRESH_TOKEN_SECRET,
    //             (err, payload) => {
    //                 if (err) return reject(createError.Unauthorized())
    //                 const userId = payload.aud
    //                 client.GET(userId, (err, result) => {
    //                     if (err) {
    //                         console.log(err.message)
    //                         reject(createError.InternalServerError())
    //                         return
    //                     }
    //                     if (refreshToken === result) return resolve(userId)
    //                     reject(createError.Unauthorized())
    //                 })
    //             }
    //         )
    //     })
    // },

}