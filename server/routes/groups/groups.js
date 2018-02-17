const router = require('express').Router();
const database = require('./sql.js');

router.route('/')
.get((req, res) => {
    database.getGroups(req.user.tenant_id)
    .then(groups => res.json(groups))
    .catch(err => {
        console.log(err);
        return res.status(424).json(err);
    })
})
.post((req, res) => { 
    database.addGroup(req.body.group, req.body.members, req.user.tenant_id)
    .then(response => res.status(200).json(response))
    .catch(err => {
        console.log(err);
        return res.status(424).json(err);
    })
})
.put((req, res) => {
    database.updateGroup(req.body.groupId, req.body.members, req.user.tenant_id)
    .then(response => res.status(200).json(response))
    .catch(err => {
        console.log(err);
        return res.status(424).json(err);
    })
})
.delete((req, res) => {
    database.deleteGroup(req.query.groupId, req.user.tenant_id)
    .then(response => res.status(200).json(response))
    .catch(err => {
        console.log(err);
        return res.status(424).json(err);
    })
});

router.route('/facilitator')
.put(async (req, res) => {
    let response;
    try {
        response = await database.updateFacilitator(req.body.groupId, req.body.pin, req.user.tenant_id); 
    } catch(err){
        console.log(response);
        res.status(424).send();
    }
    res.status(200).json(response);
})
module.exports = router;