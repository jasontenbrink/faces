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
                    .then(response => res.json(response))
                    .catch(err => {
                        console.log(err);
                        return res.json(err);
                    })
            }
        });
    } else res.send(401);
})

module.exports = router;