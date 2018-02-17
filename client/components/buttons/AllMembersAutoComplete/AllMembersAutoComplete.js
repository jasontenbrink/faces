import React from 'react'
import {connect} from 'react-redux'
import AutoComplete from 'material-ui/AutoComplete'

function mapStateToProps (state){
    return {
        allMembers: Object.keys(state.members).map( key => {
            const member = state.members[key];
            return {
                name: `${member.last_name}, ${member.first_name}`,
                pin: member.pin
            }
        })
    }
}

const AllMembersAutoComplete = ({allMembers, dispatch, handleNewRequest, handleUpdateInput, handleFilter, searchText})=>{
    return  
        <AutoComplete
            searchText={searchText}
            onUpdateInput={handleUpdateInput}
            onNewRequest={handleNewRequest}
            floatingLabelText="Add a Member"
            hintText="Last Name"
            dataSource={allMembers}
            dataSourceConfig={{text: "name", value: "pin"}}
            openOnFocus={true}
            filter={(searchText, key, member) => {
                return (
                    !this.state.members.find(groupMember => groupMember.pin === member.pin)
                    && key.indexOf(searchText) === 0
                )
            }}
            maxSearchResults={5} />
}

export default connect(mapStateToProps)(AllMembersAutoComplete);