const express = require('express');
const router = express.Router();
const database = require('./sql');

router.route('/')
.put( (req, res) => {
    if (req.user.role > 1){
        database.updateRole(req.body.pin, req.body.role, req.user.tenant_id)
        .then( databaseResponse => {
            res.json(databaseResponse.role);
        })
        .catch( err => {
            console.log(err);
            res.sendStatus(424);
        }); 
    } else res.sendStatus(403);
});

module.exports = router;  