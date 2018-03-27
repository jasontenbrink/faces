import React from 'react'
import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete'
import {connect} from 'react-redux'

const titleStyle = {
    alignSelf: 'flex-end',
    fontWeight: 300
}

const AddMembers = ({style, isDisabled, group, allMembers, dispatch}) => {
    console.log('description', isDisabled)
    if(isDisabled){
        return <p
           style={{...style}} 
        >
            {group.facilitator.last_name}, {group.facilitator.first_name}
        </p>
    }
    else {
        return 
    }
}

export default connect()(AddMembers);