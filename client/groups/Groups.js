import { Component } from 'react'
import PropTypes from 'prop-types'
import { react2angular } from 'react2angular'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import GroupsTable from './GroupsTable/GroupsTable'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();  // prevents  Warning: Unknown prop `onTouchTap`


class Groups extends Component {
  render() {
    console.log('props', this.props)
    return <MuiThemeProvider><div>
        <h3 style={{padding: '10px'}}>coming soon!  A place to track small groups, committees, and more!</h3>
        foo: { this.props.foo }
        FOO: {this.props.FOO}
        <RaisedButton label="a button" />
        <GroupsTable />
      </div>
    </MuiThemeProvider>
  }
}

Groups.propTypes = {
    foo: PropTypes.string.isRequired
}

angular
  .module('app')
  .constant('FOO', 'hi dad')
  .component('groups', react2angular(Groups,['foo'], ['FOO']))