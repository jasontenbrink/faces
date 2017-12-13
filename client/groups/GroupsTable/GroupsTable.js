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
        groupName: "club awesome",
        facilitator: {
            firstName: "Don",
            lastName: "Draper",
        }
    },
    {
        groupName: "club shite",
        facilitator: {
            firstName: "Dweeb",
            lastName: "Mcdufus",
        }
    }
]

export default class GroupsTable extends Component {
    render(){
        return <Table>
            <TableHeader>
                <TableRow>
                    <TableHeaderColumn>Group Name</TableHeaderColumn>
                    <TableHeaderColumn>Facilitator</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tableData.map((group, index) => {
                    return (
                        <TableRow key={index}>
                            <TableRowColumn>{group.groupName}</TableRowColumn>
                            <TableRowColumn>
                                {group.facilitator.firstName} 
                                {group.facilitator.lastName} 
                            </TableRowColumn>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    }
}
    