import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import {connect} from 'react-redux'
import GoogleButton from '../../../components/buttons/GoogleButton'
import FacebookButton from '../../../components/buttons/FacebookButton'
function mapStateToProps(state){
    return{}
}

export default connect(mapStateToProps)
(class ThirdPartyAuthentication extends React.Component {
    state = {}

    render(){
        return (
            <div style={this.props.style}>
                <GoogleButton 
                    label="Enable Google Sign In" 
                    style={{marginRight: "10px"}}/>
                <FacebookButton label="Enable Facebook Sign In" />
            </div>
        )
    }
})