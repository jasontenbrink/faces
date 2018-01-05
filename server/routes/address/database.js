const pgQuery = require('pg-query');

module.exports = {
    updateAddress(address){
        return pgQuery(`UPDATE addresses SET house_number = $1, street = $2, city = $3, 
                county = $4, state = $5, zip = $6 
            WHERE address_id = $7
            RETURNING address_id`,
        [
            address.house_number, address.street, address.city,
            address.county, address.state, address.zip, address.address_id
        ]);
    }
};


// pgQuery ("UPDATE addresses SET house_number = $1, \
// street = $2, \
// city = $3, \
// county = $4, \
// state = $5, \
// zip = $6 \
// WHERE address_id = $7 RETURNING address_id",
// [req.body.house_number, req.body.street, req.body.city,
// req.body.county, req.body.state, req.body.zip, req.body.address_id],
// function (err, rows, results) {
// if (err){
//   console.log('address route: ', err);
//   res.json(err);
// }
// res.json(rows);
// console.log(rows);
// });