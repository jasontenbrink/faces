pgQuery = require('pg-query')

module.exports = {
    getProfile(pin){
        return pgQuery(`SELECT email, p.pin, first_name, tenant_id, role, last_name, address_id 
            FROM people p
            LEFT JOIN people_and_addresses pa
            ON p.pin=pa.pin
            WHERE p.pin = $1`, [pin])
        .then(rows => {
            const user = rows[0][0];
            return {
                username: user.email,
                first_name: user.first_name,
                tenant_id: user.tenant_id,
                role: user.role,
                last_name: user.last_name,
                pin: user.pin,
                address_ids: rows[0].map(row => row.address_id)
            }
        });
    },
    getEmailWithFacebookId (facebookId){
        return pgQuery(`
            SELECT email, pin
            FROM people
            WHERE facebook_id = $1`, [facebookId])
        .then( response => response[0][0]);
    },
    getPinWithGoogleId (googleId){
        return pgQuery(`
            SELECT email, pin
            FROM people
            WHERE google_id = $1`, [googleId]);
    },
    addFacebookAuthToAccount(facebookProfile, token, email){
        return pgQuery(`
            UPDATE people
            SET facebook_id = $1, facebook_token = $2
            WHERE email = $3`, 
            [facebookProfile.id, token, email]
        )
    },
    addGoogleAuthToAccount(profile, token, email){
        return pgQuery(`
            UPDATE people
            SET google_id = $1, google_token = $2
            WHERE email = $3`, 
            [profile.id, token, email]
        )
    }
}