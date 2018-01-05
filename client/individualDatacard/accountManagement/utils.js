export function formatRole (role){
    switch (role){
        case 1: return 'Member';
        case 2: return 'Administrator';
        case 3: return 'Minister';
    }
    return "No Role Assigned"
}