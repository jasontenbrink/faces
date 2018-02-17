import React from 'react';
import {connect} from 'react-redux'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import {Link} from 'react-router-dom'
import {getGroupsWithFacilitatorNames} from './selectors'
import Close from 'material-ui/svg-icons/navigation/close'

function mapStateToProps(state){
    console.log("groups tabe map state to props")
    return {
        groups: getGroupsWithFacilitatorNames(state)
    }
}

const GroupsTable = ({dispatch, groups}) => {
        return <Table
            onCellClick={(row, col) => { 
                if (col===1) {
                    dispatch({type: "SET_SELECTED_GROUP_ID", value: groups[row].group_id}) //swap datatable with data passed in from stor evia props
                    window.location.assign('#/group');
                }
                if (col===2){
                    //TODO dispatch selected member. will need to to memberservice into redux
                    window.location.assign('#/individualDatacard');
                }
            }}
            selectable={false}>
            <TableHeader
                displaySelectAll={false}
                adjustForCheckBox={false}
                enableSelectAll={false}>
                <TableRow>
                    <TableHeaderColumn>Group Name</TableHeaderColumn>
                    <TableHeaderColumn>Facilitator</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={false}
                showRowHover={false}>
                {groups.map((group, index) => {
                    return (
                        <TableRow key={index}>
                            <TableRowColumn
                                onMouseEnter={(e) => handleMouseEnterStyles(e.target)}
                                onMouseLeave={(e) => handleMouseLeaveStyles(e.target)}>
                                {group.group_name}
                            </TableRowColumn>
                            <TableRowColumn
                                onMouseEnter={(e) => handleMouseEnterStyles(e.target)}
                                onMouseLeave={(e) => handleMouseLeaveStyles(e.target)}>
                                
                                    {group.facilitator.first_name} &nbsp;
                                    {group.facilitator.last_name}
                                
                            </TableRowColumn>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
}

function handleMouseEnterStyles(el) {
    el.style.backgroundColor = 'rgb(245,245,245)';
    el.style.cursor = 'pointer';
}

function handleMouseLeaveStyles(el) {
    el.style.backgroundColor = 'inherit';
    el.style.cursor = 'auto';
}

export default connect(mapStateToProps)(GroupsTable);