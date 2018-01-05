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
    yield takeEvery('UPDATE_PASSWORD', updatePassword)
}

export function* rootSaga(){
    console.log('root saga')
    yield all([
        watchUpdatePassword(),
        watchUpdateRole(), 
    ]);
}

