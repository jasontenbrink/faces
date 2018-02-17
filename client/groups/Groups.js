import React from 'react'
import {Provider} from 'react-redux'
import {HashRouter as Router, Link} from 'react-router-dom'
import { react2angular } from 'react2angular'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import GroupsTable from './GroupsTable/GroupsTable'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();  // prevents  Warning: Unknown prop `onTouchTap`

const Groups = ({foo, FOO, $ngRedux}) => {
    return <MuiThemeProvider>
        <Provider store={$ngRedux}><Router><div>
        <h1>Groups and Commitees</h1>
        <Link id="createGroupButton" to="/create-group">Creat Group</Link>
        <GroupsTable />
        {/* {(()=>{
          setTimeout(()=>{
            document.getElementById('createGroupButton').click();
          }, 0)
        })()} */}
      </div></Router></Provider>
    </MuiThemeProvider>
}


angular
  .module('app')
  .component('groups', react2angular(Groups,[], ['$ngRedux'])) //first array is stuff passed in through html, second array is passed in through angular injection