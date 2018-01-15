import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const tableData = [
    {
        groupName: "Awesome Committee",
        facilitator: {
            firstName: "Don",
            lastName: "Draper",
        }
    },
    {
        groupName: "Small Group #1",
        facilitator: {
            firstName: "Dweeb",
            lastName: "Mcdufus",
        }
    }
]

export default class GroupsTable extends Component {
    render(){
        return <Table
                onCellClick={(e,c)=>{console.log('hi dad',e,c)}}
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
                {tableData.map((group, index) => {
                    return (
                        <TableRow key={index}>
                            <TableRowColumn 
                                onMouseEnter={(e) => handleMouseEnterStyles(e.target)}
                                onMouseLeave={(e) => handleMouseLeaveStyles(e.target)}>
                                {group.groupName}
                            </TableRowColumn>
                            <TableRowColumn
                                onMouseEnter={(e) => handleMouseEnterStyles(e.target)}
                                onMouseLeave={(e) => handleMouseLeaveStyles(e.target)}>
                                {group.facilitator.firstName} &nbsp;
                                {group.facilitator.lastName} 
                            </TableRowColumn>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    }
}

function handleMouseEnterStyles(el){
    el.style.backgroundColor = 'rgb(245,245,245)';
    el.style.cursor = 'pointer';
}

function handleMouseLeaveStyles(el){
    el.style.backgroundColor = 'inherit';
    el.style.cursor = 'auto';
}