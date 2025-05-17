import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Server from "../../server"

const GetNote = ({ note }) => {

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px' }}>
                <Table>

                    <TableRow>
                        <TableCell align='center'>Title</TableCell>
                        <TableCell align='center'>Description</TableCell>
                    </TableRow>
                    <TableBody>
                        {note.map((note) => (
                            <TableRow key={note._id}>
                                <TableCell align='center'>{note.title}</TableCell>
                                <TableCell align='center'>{note.content}</TableCell>
                            </TableRow>
                        ))}


                    </TableBody>
                </Table>
            </Box>
        </>
    )
}

export default GetNote
