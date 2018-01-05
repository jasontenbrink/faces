import axios from 'axios'

export default {
    updateRole(role, pin) {
        return axios.put('/memberAdmin/roles', {
            role,
            pin
        })
    },
    updatePassword(password, pin){
        return axios.put('/passwordManagement', {password, pin})
    }
}