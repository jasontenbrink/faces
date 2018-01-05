import React from 'react'
import { react2angular } from 'react2angular'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {Provider} from 'react-redux'
import AccountManagement from './AccountManagement'
// import store from '../../state/store' //once angular is pulled out uncomment this and it should work just fine
import { indigo500 } from 'material-ui/styles/colors';

const theme = {
  palette: {
    primary1Color: indigo500
  }
}

const AccountManagementWrapper = props => {
  console.log('wrapper props', props);
  return <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <Provider store={props.$ngRedux}>
      <AccountManagement {...props} />
    </Provider>
</MuiThemeProvider>
}

angular
  .module('app')
  .constant('FOO', 'hi dad')
  .component('accountManagements', react2angular(AccountManagementWrapper,['foo', 'member'], ['FOO', '$ngRedux']))