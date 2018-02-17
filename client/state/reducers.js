import {combineReducers} from 'redux'

function role(state=null, action) {
    switch(action.type){
        case "UPDATE_ROLE_SUCCESS": {
            return action.value
        }
    }
    return state;
}

function groups(state=[], action){
    switch(action.type){
        case "ADD_GROUPS": {
            return state.concat(action.value);
        }
        case "DELETE_GROUP_SUCCESS": {
            return state.filter(group => group.group_id != action.value.groupId)
        }
        case "ADD_GROUP_SUCCESS": {
            return [...state,action.value]
        }
        case "UPDATE_GROUP_MEMBERS": {
            return state.map(group => {
                if (group.group_id == action.value.groupId){
                    return {...group, members: action.value.members}
                }
                else return group
            })
        }
        case "UPDATE_GROUP_FACILITATOR": {
            return state.map(group => {
                if (group.group_id == action.value.groupId){
                    return {...group, facilitator_pin: action.value.pin}
                }
                else return group
            })
        }
    }
    return state;
}

function selectedGroupId(state = -1, action){
    switch(action.type){
        case "SET_SELECTED_GROUP_ID": return action.value;
    }
    return state;
}

function members(state={}, action) {
    switch(action.type){
        case "ADD_MEMBER": {
            return {
                ...state,
                [action.value.pin]: action.value
            }
        }
        case "ADD_MEMBERS": {
            return {
                ...state,
                ...action.value.reduce((total, member) => {
                    return {...total, [member.pin]: member}
                }, {})
            }
        }
    }
    return state
}

function updateRole(state={
    isFetching: false,
    error: null
}, action){
    switch(action.type){
        case "UPDATE_ROLE_START": {
            return {...state, isFetching: true}
        }
        case "UPDATE_ROLE_SUCCESS": {
            return {...state, isFetching: false}
        }
        case "UPDATE_ROLE_FAILURE": {
            return {
                ...state,
                isFetching: false,
                error: action.value
            }
        }
    }
    return state;
}

function passwordUpdateSuccessTimer(state=false, action){
    switch(action.type){
        case "UPDATE_PASSWORD_SUCCESS": {
            return true;
        }
        case "HIDE_PASSWORD_UPDATE_SUCCESS": {
            return false;
        }
    }
    return state;
}

function selectedMember(state=null, action){
    switch(action.type){
        case "SET_SELECTED_MEMBER": {
            return action.value
        }
    }
    return state
}

function updatePasswordCall(state={
    isFetching: false,
    lastCallStatus: null,
    error: null
}, action){
    return networkCallReducerHelper('UPDATE_PASSWORD', state, action);
}

function user(state={}, action){
    switch(action.type){
        case "SET_USER": {
            return action.value;
        }
    }
    return state;
}

function networkError(state=false, action){
    switch(action.type){
        case "403_ERROR": return action.value
    }
    return state;
}

function postGroupCall(state={
    isFetching: false,
    error: null
}, action){
    return networkCallReducerHelper('ADD_GROUP', state, action);
}

export default combineReducers({
    updateRole, role, updatePasswordCall, members, selectedMember, user, networkError,
    postGroupCall, groups, selectedGroupId
});


//////////////////UTILS/////////////////////////////////////////
function networkCallReducerHelper(actionName, state, action){
    switch(action.type){
        case `${actionName}_START`: {
            return {...state, isFetching: true}
        }
        case `${actionName}_SUCCESS`: {
            return {
                ...state,
                status: action.value.status,
                isFetching: false
            }
        }
        case `${actionName}_FAILURE`: {
            return {
                ...state,
                status: action.value.status,
                isFetching: false,
                error: action.value.error
            }
        }
        case `RESET_${actionName}_STATUS`: {
            return {...state, status: null}
        }
    }
    return state;
}