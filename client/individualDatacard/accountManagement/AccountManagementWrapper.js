import { Component } from 'react'
import { react2angular } from 'react2angular'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();  // prevents  Warning: Unknown prop `onTouchTap`


class AccountManagementWrapper extends Component {
  render() {
    console.log('props', this.props)
    return <MuiThemeProvider><div>
        <h3 style={{padding: '10px'}}>accountManagement!</h3>
        foo: { this.props.foo }
        FOO: {this.props.FOO}
        <RaisedButton label="a button" />
      </div>
    </MuiThemeProvider>
  }
}

angular
  .module('app')
  .constant('FOO', 'hi dad')
  .component('accountManagements', react2angular(AccountManagementWrapper,['foo'], ['FOO']))