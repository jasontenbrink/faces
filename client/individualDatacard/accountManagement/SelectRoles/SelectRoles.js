import React, {Component} from 'react'
import {connect} from 'react-redux'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import axios from 'axios'

const roles = [
    <MenuItem key={1} value={1} primaryText="Member" />,
    <MenuItem key={2} value={2} primaryText="Administrator" />,
    <MenuItem key={3} value={3} primaryText="Minister" />,
];

function mapStateToProps(state){
    return {
        updateRole: state.updateRole
    }
}

export default connect(mapStateToProps)
(class SelectRoles extends Component {
    state = {};

    handleChange = (e, index, value) => {
        this.setState({selectedRole: value});
    }

    updateRole = () => {
        this.props.dispatch({
            type: "UPDATE_ROLE", 
            pin: this.props.pin,
            role: this.state.selectedRole
        });
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.memberRole) {
            this.setState({selectedRole: nextProps.memberRole})
        }
    }

    render(){
        console.log('state', this.state);
        console.log('select roles props', this.props);
        return (
            <div style={this.props.style}>
                
                <SelectField
                    value={this.state.selectedRole}
                    onChange={this.handleChange}
                    floatingLabelText="New Role"
                >
                    {roles}
                </SelectField>
                <RaisedButton 
                    style={{position: "relative", top: "-20px"}}
                    label="Update Role"
                    onClick={this.updateRole}
                    disabled={this.props.updateRole.isFetching} />
                
            </div>
        )
    }
})