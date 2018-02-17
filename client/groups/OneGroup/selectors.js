export function getGroupWithMemberNames(state){
    const group = state.groups.filter(group => group.group_id === state.selectedGroupId)[0];
    return {
        ...group,
        facilitator: state.members[group.facilitator_pin]
    }
}

export function getGroupMembers(state){
    const group = state.groups.filter(group => group.group_id === state.selectedGroupId)[0];
    group.members = group.members || [];
    return group.members.map( memberId => {
            return {
                name: `${state.members[memberId].last_name}, ${state.members[memberId].first_name}`,
                pin: memberId
            }
        })
    
}