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
import { useEffect, useState } from 'react';
import { isLoggedIn } from '../../helpers/loginHelp';
import { getHabit } from '../../apiCalls/reportCalls';
import Scrollbar from '../Scrollbar';


const Habit = [
    { name: "name name name name", point: 5, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 6, saturday: 7, sunday: 8 },
    { name: "name name name name", point: 5, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 6, saturday: 7, sunday: 8 },
    { name: "name name name name", point: 5, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 6, saturday: 7, sunday: 8 },
    { name: "name name name name", point: 5, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 6, saturday: 7, sunday: 8 },
    { name: "name name name name", point: 5, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 6, saturday: 7, sunday: 8 }
]
// ----------------------------------------------------------------------

export default function HabitTable({ id }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [habits, setHabit] = useState([]);
    useEffect(() => {
        const token_ = isLoggedIn();
        setHabit([])
        setLoading(true)
        getHabit(token_.token, id).then(data => {
            console.log("data", data)
            if (data && Array.isArray(data) && data.length > 0) {
                setHabit(data)
                setLoading(false)
            } else {
                setError("Unable to get habit data")
                setLoading(false)
            }
        })
    }, [id])
    if (loading) {
        return "loading"
    }
    console.log("Habits", habits)
    return (
        <>
            <Container className="mt-4">
                <Card>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            {habits.map((habit, index) => {
                                return <Table>
                                    <TableHead>
                                        <Typography variant="h6" id="tableTitle" component="div" px={2} py={2}>
                                            Habit
                                        </Typography>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="left" className="totals">Habit</TableCell>
                                            <TableCell align="left" className="totals">Point value</TableCell>
                                            <TableCell align="left" className="totals">Monday<br />Date</TableCell>
                                            <TableCell align="left" className="totals">Tuesday<br />Date</TableCell>
                                            <TableCell align="left" className="totals">Wednesday<br />Date</TableCell>
                                            <TableCell align="left" className="totals">Thursday<br />Date</TableCell>
                                            <TableCell align="left" className="totals">Friday<br />Date</TableCell>
                                            <TableCell align="left" className="totals">Saturday<br />Date</TableCell>
                                            <TableCell align="left" className="totals">Sunday<br />Date</TableCell>
                                        </TableRow>
                                        {habit.map((e, index) => {
                                            <TableRow
                                                hover
                                                tabIndex={-1}>
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
                                        })}
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
                            })}
                        </TableContainer>
                    </Scrollbar>
                </Card>
            </Container>
        </>
    );
}
