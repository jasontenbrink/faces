import React from 'react'
import {Provider} from 'react-redux'
import { react2angular } from 'react2angular'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin';
import OneGroup from './OneGroup'

const OneGroupWrapper = ({$ngRedux}) => {
    console.log('one group')
    return <MuiThemeProvider>
        <Provider store={$ngRedux}>
            <OneGroup />
        </Provider>
    </MuiThemeProvider>
}

angular
  .module('app')
  .component('group', react2angular(OneGroupWrapper,[], ['$ngRedux']))