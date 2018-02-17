import {put, all, takeEvery} from 'redux-saga/effects'
import api from '../api/' // should move the axios call out of SelectRole and put it in apis.js
import {wait} from './utils'

function* updateRole(action){
    yield put({type: "UPDATE_ROLE_START"});
    try {
        const {data} = yield api.updateRole(action.role, action.pin);
        yield put({type: "UPDATE_ROLE_SUCCESS", value: data});
    }
    catch(err){
        yield put({type: "UPDATE_ROLE_FAILURE", err});
    }
}

function* watchUpdateRole(){
    yield takeEvery('UPDATE_ROLE', updateRole);
}

function* updatePassword(action){
    yield put({type: "UPDATE_PASSWORD_START"});
    try {
        const response = yield api.updatePassword(action.password, action.pin)
        yield put({type: "UPDATE_PASSWORD_SUCCESS", value: {status: 'success', error: null}})
        yield wait(5000);
        yield put({type: 'RESET_UPDATE_PASSWORD_STATUS'})
    }
    catch(error){
        yield put({type: "UPDATE_PASSWORD_FAILURE", value: {status: 'failed', error}})
        yield wait(2000);
        yield put({type: 'RESET_UPDATE_PASSWORD_STATUS'})
    }
}

function* watchUpdatePassword(){
    yield takeEvery('UPDATE_PASSWORD', updatePassword);
}

function* addGroup(action){
    yield put({type: "ADD_GROUP_START"});
    try {
        const {data} = yield api.addGroup(action.group, action.members);
        yield put({type: "ADD_GROUP_SUCCESS", value: data});
    }
    catch(err){
        yield put({type: "ADD_GROUP_FAILURE", err});
    }
}

function* watchAddGroup(){
    yield takeEvery('ADD_GROUP', addGroup);
}

function* addMemberToGroup(action){
    yield put ({type: "ADD_MEMBER_TO_GROUP_START" });
    try {
        const {data} = yield api.updateGroupMembers(action.value)
        yield put({type: "ADD_MEMBER_TO_GROUP_SUCCESS", value: data});
    }
    catch(err){
        yield put({type: "ADD_MEMBER_TO_GROUP_FAILURE", err});
    }
}

function* watchAddMemberToGroup(){
    yield takeEvery('ADD_MEMBER_TO_GROUP', addMemberToGroup)
}

function* updateGroupMembers(action){
    yield put ({type: "UPDATE_GROUP_MEMBERS_START" });
    try {
        const {data} = yield api.updateGroupMembers(action.value)
        yield put({type: "UPDATE_GROUP_MEMBERS_SUCCESS", value: data});
    }
    catch(err){
        yield put({type: "UPDATE_GROUP_MEMBERS_FAILURE", err});
    }
}

function* watchUpdateGroupMembers(){
    yield takeEvery('UPDATE_GROUP_MEMBERS', updateGroupMembers)
}

function* deleteGroup(action){
    yield put ({type: "DELETE_GROUP_START" });
    try {
        const {data} = yield api.deleteGroup(action.value)
        yield put({type: "DELETE_GROUP_SUCCESS", value: data});
    }
    catch(err){
        yield put({type: "DELETE_GROUP_FAILURE", err});
    }
}

function* watchDeleteGroup(){
    yield takeEvery('DELETE_GROUP', deleteGroup);
}

function* updateGroupFacilitator(action){
    yield put ({type: "UPDATE_GROUP_FACILITATOR_START" });
    try {
        const {data} = yield api.updateGroupFacilitator(action.value)
        yield put({type: "UPDATE_GROUP_FACILITATOR_SUCCESS", value: data});
    }
    catch(err){
        yield put({type: "UPDATE_GROUP_FACILITATOR_FAILURE", err});
    }
}

function* watchUpdateGroupFacilitator(){
    yield takeEvery('UPDATE_GROUP_FACILITATOR', updateGroupFacilitator);
}

export function* rootSaga(){
    console.log('root saga')
    yield all([
        watchUpdatePassword(),
        watchUpdateRole(),
        watchAddGroup() ,
        watchAddMemberToGroup(),
        watchDeleteGroup(),
        watchUpdateGroupMembers(),
        watchUpdateGroupFacilitator()
    ]);
}


//////////////Utility functions//////////////////
function* sagaHelper(actionType, api){
    yield put(`${actionType}_START`)
    try {
        const {data} = yield(api)
    }
    catch(err){

    }
}

