import React from 'react'
import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete'
import {connect} from 'react-redux'

const titleStyle = {
    alignSelf: 'flex-end',
    fontWeight: 300
}

const GroupFacilitator = ({style, isDisabled, group, allMembers, dispatch}) => {
    console.log('description', isDisabled)
    if(isDisabled){
        return <p
           style={{...style}} 
        >
            {group.facilitator.last_name}, {group.facilitator.first_name}
        </p>
    }
    else {
        return <AutoComplete
            disabled={isDisabled}
            onNewRequest={({ pin }) => {
                dispatch({ type: "UPDATE_GROUP_FACILITATOR", value: { groupId: group.group_id, pin } })
            }}
            floatingLabelText="Facilitator"
            dataSource={allMembers}
            dataSourceConfig={{ text: "name", value: "pin" }}
            filter={(searchText, key) => key.indexOf(searchText) === 0}
            maxSearchResults={5}
            searchText={(() => {
                if (group.facilitator.last_name) {
                    return `${group.facilitator.last_name}, ${group.facilitator.first_name}`
                } else return "";
            })()}
            openOnFocus={true} />
    }
}

export default connect()(GroupFacilitator);