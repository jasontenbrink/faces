import React from 'react'
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import Divider from 'material-ui/Divider' 
import Snackbar from 'material-ui/Snackbar'         
import GoogleButton from '../../components/buttons/GoogleButton'
import FacebookButton from '../../components/buttons/FacebookButton'
import SelectRoles from './SelectRoles'
import {formatRole} from './utils'
import PermissionsError from '../../components/PermissionsError'
import PasswordManagement from './PasswordManagement'
import ThirdPartyAuthentication from './ThirdPartyAuthentication'

const titleStyle = {
    // textAlign: "center"
    fontSize: "18pt"
}

const sectionStyle = {
    marginLeft: "30px"
}

const AccountManagement = ({member, updateRole, role, userRole}) => {
    console.log('role', role);
    return (<div style={{display: "flex", flexDirection: "column", paddingLeft: "10px"}}>
        <br />
        <p style={titleStyle}>Password Management</p>
        <Divider />
        <br />
        <PasswordManagement 
            style={sectionStyle}
            pin={member.pin} />
        <br />
        <br />
        <p style={titleStyle}> Third Party Authentication</p>
        <Divider />
        <br />
        <ThirdPartyAuthentication style={{...sectionStyle, display: "flex"}} />
        <br />
        <br />
        {showPriveleges( (userRole > 1), member, role, updateRole)}
    </div>)
}

function showPriveleges(show, member, role, updateRole){
    if(show){
        return (
            <div>
                <p style={titleStyle}>Priveleges</p>
                <Divider />
                <br />
                <div style={sectionStyle}>
                    <p>Role: {formatRole(role || member.role)} </p>
                    <PermissionsError error={updateRole.error}/>
                    <SelectRoles memberRole={member.role} pin={member.pin} />
                </div>
            </div>
        )
    } else return null;
}

function mapStateToProps(state){
    return {
        updateRole: state.updateRole,
        role: state.role,
        userRole: state.user.role
    }
}

export default connect(mapStateToProps)(AccountManagement);