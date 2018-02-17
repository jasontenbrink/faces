export function getGroupsWithFacilitatorNames(state){
    return state.groups.map( group => {
        return {
            ...group, 
            facilitator: state.members[group.facilitator_pin] || {},
        }
    })
}