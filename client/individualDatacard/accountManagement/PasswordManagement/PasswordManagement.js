import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {connect} from 'react-redux'
import PermissionsError from '../../../components/PermissionsError'

function mapStateToProps(state){
    return{
        updatePasswordCall: state.updatePasswordCall
    }
}

export default connect(mapStateToProps)
(class PasswordManagement extends React.Component {
    state = {password: "", isSuccessShown: false};

    updatePassword = () => {this.props.dispatch({
        type: "UPDATE_PASSWORD",
        password: this.state.password,
        pin: this.props.pin
    })}

    render(){
        return (
            <div style={this.props.style}>
                <PermissionsError error={this.props.updatePasswordCall.status == 'failed'} />
                {showPasswordSuccess(this.props.updatePasswordCall.status)}
                <TextField
                    floatingLabelText="New Password"
                    type="password"
                    style={{marginRight: "10px"}}
                    onChange={e => this.setState({password: e.target.value})} />
                <RaisedButton 
                    label="Change Password" 
                    primary={true}
                    onClick={this.updatePassword}
                    disabled={this.props.updatePasswordCall.isFetching} />
            </div>
        )
    }
})

function showPasswordSuccess(status){
    
    console.log('success status', status)
    // return <p>success</p>
    if(status == 'success'){
        return <p style={{color: "green"}}>Success!</p>
    }
    else return null;
}