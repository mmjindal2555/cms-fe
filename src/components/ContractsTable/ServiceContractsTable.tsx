import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { FC } from 'react';

export interface ContractsTableProps {
    rows: Contract[]
}

export interface Contract {
    id: Number,
    description: String
    owner: String,
    assignedVendors: String[],
    currentState: String
}

function getBackgroundColor(deadline:Contract) {
    switch(deadline.currentState){
        case "DRAFT":
            return '#f0e0b6';
        case "APPROVED":
            return '#95c98d';
        case "ACTIVE":
            return '#c4daf5';
        case "INACTIVE":
            return '#f7bbba';
    }
}

export const ContractsTable: FC<ContractsTableProps> = ({rows}): JSX.Element => {
    // const rows = props.rows
    return (
        <TableContainer sx={{ maxHeight: 200, zIndex:0}} component={Paper}>
            <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#ccc" }}>
                        <TableCell><b>ID</b></TableCell>
                        <TableCell align="right"><b>Description</b></TableCell>
                        <TableCell align="right"><b>Created by</b></TableCell>
                        <TableCell align="right"><b>Assigned Vendors</b></TableCell>
                        <TableCell align="right"><b>State</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={""+row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: getBackgroundColor(row) }}
                        >
                            <TableCell component="th" scope="row">
                                {""+row.id}
                            </TableCell>
                            <TableCell align="right">{""+row.description}</TableCell>
                            <TableCell align="right">{row.owner}</TableCell>
                            <TableCell align="right">{row.assignedVendors.join(", ")}</TableCell>
                            <TableCell align="right">{row.currentState || "-"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>)
}
