import axios from 'axios'

export default {
    updateRole(role, pin) {
        return axios.put('/memberAdmin/roles', {role, pin})
    },
    updatePassword(password, pin){
        return axios.put('/passwordManagement', {password, pin})
    },
    addGroup(group, members){
        return axios.post('/groups', {group, members})
    },
    updateGroupMembers({groupId, members}){
        return axios.put('/groups', {groupId, members})
    },
    deleteGroup(groupId){
        return axios.delete('/groups', {params: {groupId}})
    },
    updateGroupFacilitator({groupId, pin}){
        return axios.put('/groups/facilitator', {groupId, pin})
    },
    fetchGroups(){
        return axios.get('/groups');
    },
    fetchMembers(){
        return axios.get('/data', {params: {}});
    }
}