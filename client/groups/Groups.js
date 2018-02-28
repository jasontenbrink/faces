import React from 'react'
import {Provider} from 'react-redux'
import {HashRouter as Router, Link} from 'react-router-dom'
import { react2angular } from 'react2angular'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import GroupsTable from './GroupsTable/GroupsTable'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();  // prevents  Warning: Unknown prop `onTouchTap`

const styles = {
  title: {
    fontWeight: 300,
    textAlign: 'center',
    backgroundColor: 'white',
  }
}


class Groups extends React.Component {
  render(){
    const {$ngRedux} = this.props;
    const userRole = $ngRedux.getState().user.role;
    return <MuiThemeProvider>
        <Provider store={$ngRedux}><Router><div style={{backgroundColor: 'white'}}>
        <br />
        <h1 style={styles.title}>Groups and Commitees</h1>
        <br />
        {(() => {
          if (userRole > 1){
            return <Link id="createGroupButton" to="/create-group">Creat Group</Link>
          }
          else return null
        })()}        
        <GroupsTable />
        {/* {(()=>{
          setTimeout(()=>{
            document.getElementById('createGroupButton').click();
          }, 0)
        })()} */}
      </div></Router></Provider>
    </MuiThemeProvider>
  } 
}
// const Groups = ({foo, FOO, $ngRedux}) => {
//   const userRole = $ngRedux.getState().user.role;
//   return <MuiThemeProvider>
//       <Provider store={$ngRedux}><Router><div>
//       <h1>Groups and Commitees</h1>
//       {(() => {
//         if (userRole > 1){
//           return <Link id="createGroupButton" to="/create-group">Creat Group</Link>
//         }
//         else return null
//       })()}        
//       <GroupsTable />
//       {/* {(()=>{
//         setTimeout(()=>{
//           document.getElementById('createGroupButton').click();
//         }, 0)
//       })()} */}
//     </div></Router></Provider>
//   </MuiThemeProvider>
// }


angular
  .module('app')
  //first array is stuff passed in through html, second array is passed in through angular injection
  .component('groups', react2angular(Groups,[], ['$ngRedux']))