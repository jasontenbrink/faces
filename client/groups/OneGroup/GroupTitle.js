import React from 'react'
import GroupsTable from '../GroupsTable/GroupsTable';
import TextField from 'material-ui/TextField'

const titleStyle = {
    alignSelf: 'flex-end',
    fontWeight: 300
}

const GroupTitle = ({style, isDisabled, groupName}) => {
    if(isDisabled){
        return <h1 
                    style={{...style, ...titleStyle}}
                >
                {groupName}</h1>
    }
    else {
        return <TextField 
            name="groupName" 
            value={groupName} 
            style={{...style}} />

    }
}

export default GroupTitle;