export function getGroupWithMemberNames(state){
    const group = state.groups.filter(group => group.group_id == state.selectedGroupId)[0];

    if(!group) return {members: [], facilitator: {first_name: "", last_name: ""}}
    return {
        ...group,
        facilitator: state.members[group.facilitator_pin] || {first_name: "", last_name: ""}
    }
}

export function getGroupMembers(state){
    const group = state.groups.filter(group => group.group_id == state.selectedGroupId)[0];
    if(!group) return [];
    group.members = group.members || [];
    return group.members.map( memberId => {
            return {
                name: `${state.members[memberId].last_name}, ${state.members[memberId].first_name}`,
                pin: memberId
            }
        })
    
}