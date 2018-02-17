import React from 'react'
import {connect} from 'react-redux'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import {getGroupWithMemberNames, getGroupMembers} from './selectors'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField/'
import AutoComplete from 'material-ui/AutoComplete'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ReactTable from 'react-table'
import Close from 'material-ui/svg-icons/navigation/close'

function mapStateToProps(state){
    return {
        group: getGroupWithMemberNames(state),
        allMembers: Object.keys(state.members).map( key => {
            const member = state.members[key];
            return {
                name: `${member.last_name}, ${member.first_name}`,
                pin: member.pin
            }
        }),
        groupMembers: getGroupMembers(state),
        userRole: state.user.role
    }
}

export default connect(mapStateToProps)
(class OneGroup extends React.Component{
    state = {
        groupName: this.props.group.group_name || "",
        description: this.props.group.description || "",
        facilitator: this.props.group.facilitator || {},
        searchText: "",
        isDisabled: true,
        adminAction: ""
    }

    handleAdminSelection = (event, index, value) => {
        if(value === 'delete' && confirm('delete this group?')){
            this.props.dispatch({type: 'DELETE_GROUP', value: this.props.group.group_id})
            window.location.assign('#/groups');
        }
    }

    removeMember = pin => {
        const members = this.props.groupMembers.filter( member => member.pin != pin).map( member => member.pin);
        this.props.dispatch({type: "UPDATE_GROUP_MEMBERS", value: {groupId: this.props.group.group_id, members}})
    }

    render() {
        const {group, allMembers, dispatch, groupMembers, userRole} = this.props;
        const {groupName, description, facilitator, searchText, isDisabled, adminAction} = this.state;

        return <div>
            

            <TextField name="groupName" value={groupName} disabled={isDisabled}/>
            <h1> {group.group_name} </h1>
            
            {(()=>{
                if(userRole > 1){
                    return <div>
                        <RaisedButton label="edit" primary={true} onClick={()=>this.setState({isDisabled: !isDisabled})} />
                        <SelectField
                            floatingLabelText="Admin Actions"
                            value={adminAction} 
                            onChange={this.handleAdminSelection}
                        >
                            <MenuItem value="delete" primaryText="delete" />    
                        </SelectField>
                    </div>
                }
                else return null
            })()}

            <TextField name="description" value={description} disabled={isDisabled} />
            <p>{description}</p>

            <AutoComplete
                disabled={isDisabled}
                onNewRequest={({pin}) => {
                    dispatch({type:"UPDATE_GROUP_FACILITATOR", value: {groupId: group.group_id, pin}})
                }}
                floatingLabelText="Facilitator"
                dataSource={allMembers}
                dataSourceConfig={{text: "name", value: "pin"}}
                filter={(searchText, key) => key.indexOf(searchText) === 0}
                maxSearchResults={5}
                searchText={`${group.facilitator.last_name}, ${group.facilitator.first_name}`}
                openOnFocus={true} />
            <TextField name="facilitator" value={`${facilitator.last_name}, ${facilitator.first_name}`} disabled={isDisabled} />
            <p>Facilitator: {facilitator.last_name}, {facilitator.first_name}</p>

            <AutoComplete
                    searchText={searchText}
                    onUpdateInput={searchText => this.setState({searchText})}
                    onNewRequest={(selection, index) => {
                        const newMembers = [...groupMembers, allMembers.filter(member => selection.pin == member.pin)[0]]
                        this.setState({members: newMembers, searchText: ""});
                        dispatch({
                            type: "UPDATE_GROUP_MEMBERS",
                            value: {
                                groupId: group.group_id,
                                members: newMembers.map(member => member.pin)
                            }
                        })
                    }}
                    floatingLabelText="Add a Member"
                    hintText="Last Name"
                    dataSource={allMembers}
                    dataSourceConfig={{text: "name", value: "pin"}}
                    openOnFocus={true}
                    filter={(searchText, key, member) => {
                        return (
                            !this.props.groupMembers.find(groupMember => groupMember.pin === member.pin)
                            && key.indexOf(searchText) === 0
                        )
                    }}
                    maxSearchResults={5}
                    />
            <List>
                {groupMembers.map( (member, index) => {
                    return (
                        <ListItem 
                            key={index} 
                            primaryText={member.name} 
                            rightIcon={<Close value={member.pin} 
                            onClick={() => this.removeMember(member.pin)} />} />
                    )
                })}
            </List>
        </div>
    }
})


