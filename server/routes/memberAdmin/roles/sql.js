const pgQuery = require('pg-query');

module.exports = {
    updateRole(pin, role, tenantId){
        return pgQuery(`
            UPDATE people
            SET role = $2
            WHERE pin = $1 AND tenant_id = $3
            RETURNING role`,
        [pin, role, tenantId])
        .then(rows => rows[0][0]);
    }
}