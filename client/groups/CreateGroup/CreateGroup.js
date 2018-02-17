import React from 'react'
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import { select } from 'redux-saga/effects';

const data = [
    {
        firstName: "John",
        lastName: "Smith",
        pin: 1
    },
    {
        firstName: "Kate",
        lastName: "Winslett",
        pin: 2
    }
];

function mapStateToProps(state){
    return {
        addGroupCall: state.postGroupCall,
        allMembers: Object.keys(state.members).map( key => {
            const member = state.members[key];
            return {
                name: `${member.last_name}, ${member.first_name}`,
                pin: member.pin
            }
        })
    }
}

export default connect(mapStateToProps)
(class CreateGroup extends React.Component {
    state = { 
        members: [],
        facilitator: "",
        description: "",
        groupName: "",
        searchText: ""
    };

    handleChange = (inputName, e) => {
        this.setState({[inputName]: e.target.value})
    }

    handleFilter = (searchText, key, member) => {
        return (
            !this.state.members.find(groupMember => groupMember.pin === member.pin)
            && key.indexOf(searchText) !== -1
        )
    }

    handleUpdateInput = searchText => this.setState({searchText});

    handleNewRequest = (selection, index) => {
        this.setState({
            members:[...this.state.members, selection],
            searchText: ""
        });
    }
    
    render(){
        console.log('this.state.members, ', this.state.members);
        const {allMembers} = this.props;
        return (<div>
            <TextField 
                name="groupName"
                onChange={e => this.handleChange("groupName", e)}
                floatingLabelText="Group Name" />
            <TextField 
                name="description"
                onChange={e => this.handleChange("description", e)}
                floatingLabelText="Group Description"
                multiLine={true} />
            <AutoComplete
                onNewRequest={({pin}, index) => {
                    console.log('selection', pin, index);
                    this.setState({facilitator: pin})
                }}
                floatingLabelText="Facilitator"
                dataSource={allMembers}
                dataSourceConfig={{text: "name", value: "pin"}}
                filter={(searchText, key) => key.indexOf(searchText) === 0}
                maxSearchResults={5}
                openOnFocus={true} />
            <AutoComplete
                searchText={this.state.searchText}
                onUpdateInput={searchText => this.setState({searchText})}
                onNewRequest={(selection, index) => {
                    this.setState({
                        members:[...this.state.members, selection],
                        searchText: ""
                    });
                }}
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
                maxSearchResults={5}
                 />
            <List>
                {this.state.members.map((member, index) => {
                    return <ListItem key={index} primaryText={member.name} />
                })}
            </List>
            <RaisedButton label="Create Group" primary={true}
                disabled={this.props.addGroupCall.isFetching} 
                onClick={() => {
                    this.props.dispatch({
                        type: "ADD_GROUP",
                        group: {
                            facilitatorPin: this.state.facilitator,
                            description: this.state.description,
                            groupName: this.state.groupName
                        },
                        members: this.state.members.map(member => member.pin)
                    });
                    window.location.assign('#/groups');
                }} />
        </div>)
    }
})

function filterMembers2(searchText, key, member){

}

function filterMembers(data, groupMembers){
    console.log('arrays', data, groupMembers)
    const newArray = data.filter(member => {
        const boo = !groupMembers.find(groupMember => {
            console.log('is it the same?', groupMember.pin === member.pin)
            return groupMember.pin === member.pin;
        });
        console.log('was member found?', boo)
        return boo;
    });
    console.log('dataArray', newArray);
    return newArray;
}