// material
import {
    Card,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Container,
    TableContainer,
    TableHead,
    Typography,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { isLoggedIn } from '../../helpers/loginHelp';
import { getHabit } from '../../apiCalls/reportCalls';
import Scrollbar from '../Scrollbar';
import Loading from '../Loading';
import NoData from '../NoData';

export default function HabitTable({ id }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [habits, setHabit] = useState([]);

    useEffect(() => {
        const token_ = isLoggedIn();
        setHabit([])
        setLoading(true)
        getHabit(token_.token, id).then(data => {
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
        return <Loading />
    }

    return (
        <>
            <Container className="mt-4">
                {(habits && Array.isArray(habits) && habits.length > 0) ?
                    habits.map((h, index) => {
                        const total = {
                            monday: 0, tuesday: 0, wednesday: 0, thursday: 0, friday: 0, saturday: 0, sunday: 0, points: 0
                        }
                        h.habits.forEach((hb, index) => {
                            total.points = total.points + (hb.points || 0)
                            total.monday = total.monday + (hb.monday || 0)
                            total.tuesday = total.tuesday + (hb.tuesday || 0)
                            total.wednesday = total.wednesday + (hb.wednesday || 0)
                            total.thursday = total.thursday + (hb.thursday || 0)
                            total.friday = total.friday + (hb.friday || 0)
                            total.saturday = total.saturday + (hb.saturday || 0)
                            total.sunday = total.sunday + (hb.sunday || 0)
                        })

                        return <Card key={index} className="card-padding">
                            <Scrollbar>
                                <TableContainer sx={{ minWidth: 800 }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ fontWeight: 600, fontSize: "1.5rem" }}>Habit</TableCell>
                                            </TableRow>
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
                                            {h.habits.map((e, index) =>
                                                <TableRow
                                                    tabIndex={-1}
                                                    key={index}>
                                                    <TableCell align="left">{e.name}</TableCell>
                                                    <TableCell align="left">{e.points}</TableCell>
                                                    <TableCell align="left">{e.monday}</TableCell>
                                                    <TableCell align="left">{e.tuesday}</TableCell>
                                                    <TableCell align="left">{e.wednesday}</TableCell>
                                                    <TableCell align="left">{e.thursday}</TableCell>
                                                    <TableCell align="left">{e.friday}</TableCell>
                                                    <TableCell align="left">{e.saturday}</TableCell>
                                                    <TableCell align="left">{e.sunday}</TableCell>
                                                </TableRow>
                                            )}
                                            <TableRow>
                                                <TableCell className="totals">Minimal Points to win the day</TableCell>
                                                <TableCell>{h.min}</TableCell>
                                                <TableCell>{total.monday >= h.min ? "true" : "false"}</TableCell>
                                                <TableCell>{total.tuesday >= h.min ? "true" : "false"}</TableCell>
                                                <TableCell>{total.wednesday >= h.min ? "true" : "false"}</TableCell>
                                                <TableCell>{total.thursday >= h.min ? "true" : "false"}</TableCell>
                                                <TableCell>{total.friday >= h.min ? "true" : "false"}</TableCell>
                                                <TableCell>{total.saturday >= h.min ? "true" : "false"}</TableCell>
                                                <TableCell>{total.sunday >= h.min ? "true" : "false"}</TableCell>
                                            </TableRow>
                                            {/* <TableRow>
                                                <TableCell className="totals">Weekly habit Success</TableCell>
                                                <TableCell>56</TableCell>
                                            </TableRow> */}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Scrollbar>
                        </Card>
                    })
                    : <NoData />
                }
            </Container>
        </>
    );
}
