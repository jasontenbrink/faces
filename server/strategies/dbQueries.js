pgQuery = require('pg-query')

module.exports = {
    getEmailTenantidRole(pin){
        return pgQuery(`SELECT email, pin, first_name, tenant_id, role, last_name 
            FROM people 
            WHERE pin = $1`, [pin])
        .then(rows => {
            const user = rows[0][0];
            return {
                username: user.email,
                first_name: user.first_name,
                tenant_id: user.tenant_id,
                role: user.role,
                last_name: user.last_name,
                pin: user.pin
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