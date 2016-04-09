var express = require('express');
var when = require('when');
var pgQuery = require('pg-query');
var router = express.Router();

pgQuery.connectionParameters = process.env.DATABASE_URL   || process.env.HEROKU_DB_URL;

router.route('/update').post(function (req, res) {
    var people = req.body;
    console.log('/address/update, people: ', people);
    // console.log('/family/update, familyId: ', familyId);
    //
    // //update family name
    // pgQuery("UPDATE families set family_name = $1 where family_id = $2",
    //   [makeFamily.makeFamilyName(people), familyId],
    //   function (err, rows, results) {
    //       if(err) res.json(err);
    //    }
    // );
    res.json("server says hi!");
});



module.exports = router;
