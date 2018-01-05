const router = require('express').Router();
const bcrypt = require('bcrypt');
const database = require('./dbQueries.js');
const SALT_WORK_FACTOR = 10;

router.put('/', (req, res) => {
    if (req.user.pin == req.body.pin || req.user.role > 1){
        bcrypt.hash(req.body.password, SALT_WORK_FACTOR, (err, hash) => {
            if (err) res.json(err)
            else {
                database.updatePassword(hash, req.body.pin)
                    .then(response => res.status(200).json(response))
                    .catch(err => {
                        console.log(err);
                        return res.status(424).json(err);
                    })
            }
        });
    } else res.sendStatus(403);
})

module.exports = router;
