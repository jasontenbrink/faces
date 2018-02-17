import React from 'react'
import {Provider} from 'react-redux'
import { react2angular } from 'react2angular'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import CreateGroup from './CreateGroup'

const CreateGroupWrapper = ({$ngRedux}) => {
    console.log('one group')
    return <MuiThemeProvider>
        <Provider store={$ngRedux}>
            <CreateGroup />
        </Provider>
    </MuiThemeProvider>
}

angular
  .module('app')
  .component('createGroup', react2angular(CreateGroupWrapper,[], ['$ngRedux']))