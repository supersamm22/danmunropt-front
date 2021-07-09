// material
import {
    Card,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TableHead,
} from '@material-ui/core';
import { useState } from 'react';
import Scrollbar from '../Scrollbar';
import { UserListHead } from '../_dashboard/user';

const DAY = [
    { id: 'empty', label: '', alignRight: false },
    { id: 'week', label: 'Week', alignRight: false },
    { id: 'monday', label: 'Monday', alignRight: false },
    { id: 'tuesday', label: 'Tuesday', alignRight: false },
    { id: 'wednesday', label: 'Wednesday', alignRight: false },
    { id: 'thursday', label: 'Thursday', alignRight: false },
    { id: 'friday', label: 'Friday', alignRight: false },
    { id: 'saturday', label: 'Saturday', alignRight: false },
    { id: 'sunday', label: 'Sunday', alignRight: false },

];
const DATE = [
    { id: 'empty', label: '', alignRight: false },
    { id: 'date', label: 'Date', alignRight: false },
    { id: '18/jan/21', label: '18/jan/21', alignRight: false },
    { id: '19/jan/21', label: '19/jan/21', alignRight: false },
    { id: '20/jan/21', label: '20/jan/21', alignRight: false },
    { id: '21/jan/21', label: '21/jan/21', alignRight: false },
    { id: '22/jan/21', label: '22/jan/21', alignRight: false },
    { id: '23/jan/21', label: '23/jan/21', alignRight: false },
    { id: '24/jan/21', label: '24/jan/21', alignRight: false },
];
const HABIT = [
    { id: 'habit', label: 'Daily Habit', alignRight: false },
    { id: 'point', label: 'Point Value', alignRight: false },
    { id: 'empty1', label: '', alignRight: false },
    { id: 'empty2', label: '', alignRight: false },
    { id: 'empty3', label: '', alignRight: false },
    { id: 'empty4', label: '', alignRight: false },
    { id: 'empty5', label: '', alignRight: false },
    { id: 'empty6', label: '', alignRight: false },
    { id: 'empty7', label: '', alignRight: false },

]
const Habbit = [
    { name: "name name name name", point: 5, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 6, saturday: 7, sunday: 8 },
    { name: "name name name name", point: 5, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 6, saturday: 7, sunday: 8 },
    { name: "name name name name", point: 5, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 6, saturday: 7, sunday: 8 },
    { name: "name name name name", point: 5, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 6, saturday: 7, sunday: 8 },
    { name: "name name name name", point: 5, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 6, saturday: 7, sunday: 8 }
]
// ----------------------------------------------------------------------

export default function HabbitTable() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Container className="mt-4">
                <Card>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <TableHead>
                                    <Typography variant="h6" id="tableTitle" component="div" px={2} py={2}>
                                        Habbit
                                    </Typography>
                                </TableHead>
                                <UserListHead
                                    headLabel={DAY}
                                />
                                <UserListHead
                                    headLabel={DATE}
                                />
                                <UserListHead
                                    headLabel={HABIT}
                                />
                                <TableBody>
                                    {Habbit.map((e, index) => {
                                        return <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={index}>
                                            <TableCell align="left">{e.name}</TableCell>
                                            <TableCell align="left">{e.point}</TableCell>
                                            <TableCell align="left">{e.monday}</TableCell>
                                            <TableCell align="left">{e.tuesday}</TableCell>
                                            <TableCell align="left">{e.wednesday}</TableCell>
                                            <TableCell align="left">{e.thursday}</TableCell>
                                            <TableCell align="left">{e.friday}</TableCell>
                                            <TableCell align="left">{e.saturday}</TableCell>
                                            <TableCell align="left">{e.sunday}</TableCell>

                                        </TableRow>
                                    }
                                    )}
                                    <TableRow
                                        hover>
                                        <TableCell className="totals">Complete Daily Total</TableCell>
                                        <TableCell>6</TableCell>
                                        <TableCell>6</TableCell>
                                        <TableCell>6</TableCell>
                                        <TableCell>6</TableCell>
                                        <TableCell>6</TableCell>
                                        <TableCell>6</TableCell>
                                        <TableCell>6</TableCell>
                                        <TableCell>6</TableCell>
                                    </TableRow>
                                    <TableRow hover>
                                        <TableCell className="totals">MInimal Points to win the day</TableCell>
                                        <TableCell>5</TableCell>
                                        <TableCell>False</TableCell>
                                        <TableCell>False</TableCell>
                                        <TableCell>False</TableCell>
                                        <TableCell>False</TableCell>
                                        <TableCell>False</TableCell>
                                        <TableCell>False</TableCell>
                                        <TableCell>False</TableCell>
                                    </TableRow>
                                    <TableRow hover>
                                        <TableCell className="totals">Weekly habit Success</TableCell>
                                        <TableCell>56</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                </Card>
            </Container>
        </>
    );
}
