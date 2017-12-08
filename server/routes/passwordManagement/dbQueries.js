const pgQuery = require('pg-query');

module.exports = {
    updatePassword(password, pin){
        return pgQuery(`
            UPDATE people
            SET password = $1
            WHERE pin = $2`,
            [password, pin]
        )
    }
}