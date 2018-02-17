const pgQuery = require('pg-query');

module.exports = {
    getGroups(tenant_id){
        return pgQuery(`
            SELECT group_id, facilitator_pin, description, group_name, members
            FROM groups
            WHERE tenant_id = $1`,
            [tenant_id]
        )
        .then( res => res[0]);
    },
    addGroup(group, members, tenant_id){
        return pgQuery(`
                INSERT INTO groups
                    (facilitator_pin, description, group_name, tenant_id, members)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING facilitator_pin, description, group_name, group_id, members`,
            [group.facilitatorPin, group.description, group.groupName, tenant_id, members]
        )
        .then(res => res[0][0])
    },
    updateGroup(groupId, members, tenant_id){
        return pgQuery(`
            UPDATE groups
            SET members = $1
            WHERE group_id = $2 AND tenant_id=$3`,
            [members, groupId, tenant_id]
        )
    },
    deleteGroup(groupId, tenant_id){
        return pgQuery(`
            DELETE FROM groups 
            WHERE group_id = $1 AND tenant_id = $2
            RETURNING group_id`,
            [groupId, tenant_id]
        )
        .then(res => res[0][0])
    },
    deleteMemberFromGroup(groupId, members, tenant_id){
        return pgQuery(`
            UPDATE groups
            SET members = $1
            WHERE group_id = $2 AND tenant_id=$3`,
            [members, groupId, tenant_id]
        )
    },
    updateFacilitator(groupId, pin, tenant_id){
        return pgQuery(`
            UPDATE groups
            SET facilitator_pin = $1
            WHERE group_id = $2 AND tenant_id = $3`,
            [pin, groupId, tenant_id]
        )
    }
}