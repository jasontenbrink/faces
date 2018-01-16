import React from 'react'
import {Provider} from 'react-redux'
import PropTypes from 'prop-types'
import { react2angular } from 'react2angular'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import GroupsTable from './GroupsTable/GroupsTable'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();  // prevents  Warning: Unknown prop `onTouchTap`


const Groups = ({foo, FOO, $ngRedux}) => {
    return <MuiThemeProvider>
        <Provider store={$ngRedux}><div>
        <h3 style={{padding: '10px'}}>[In Progress]</h3>
        <h3 style={{padding: '10px'}}>coming soon!  A place to track small groups, committees, and more!</h3>
        <GroupsTable />
      </div></Provider>
    </MuiThemeProvider>
}

Groups.propTypes = {
    foo: PropTypes.string.isRequired
}

angular
  .module('app')
  .constant('FOO', 'hi dad')
  .component('groups', react2angular(Groups,['foo'], ['FOO', '$ngRedux']))