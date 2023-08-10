import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { FC } from 'react';

export interface VendorsTableProps {
    rows: Vendor[]
}

export interface Vendor {
    id: Number,
    employeeID: Number,
    name: String,
    role: String,
    contract: String,
    startDate: String
}

export const VendorsTable: FC<VendorsTableProps> = ({rows}): JSX.Element => {
    // const rows = props.rows
    return (
        <TableContainer sx={{ maxHeight: 200, zIndex: 0}} component={Paper}>
            <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#ccc" , zIndex: 0}}>
                        <TableCell><b>ID</b></TableCell>
                        <TableCell align="right"><b>Employee-ID</b></TableCell>
                        <TableCell align="right"><b>Name</b></TableCell>
                        <TableCell align="right"><b>Role</b></TableCell>
                        <TableCell align="right"><b>Assigned Service</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={""+row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {""+row.id}
                            </TableCell>
                            <TableCell align="right">{""+row.employeeID}</TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.role}</TableCell>
                            <TableCell align="right">{row.contract || "-"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>)
}
