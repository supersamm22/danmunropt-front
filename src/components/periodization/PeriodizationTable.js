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
import { getHabit, getPeriodization } from '../../apiCalls/reportCalls';
import Scrollbar from '../Scrollbar';
import Loading from '../Loading';
import NoData from '../NoData';

export default function PeriodizationTable({ id }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [habits, setHabit] = useState([]);

    useEffect(() => {
        const token_ = isLoggedIn();
        setHabit([])
        setLoading(true)
        getPeriodization(token_.token, id).then(data => {
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
                {/* {(habits && Array.isArray(habits) && habits.length > 0) ?
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
                        }) */}

                <Card className="card-padding">
                    <Scrollbar>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 600, fontSize: "1.5rem" }}>Periodization</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="left" className="totals"></TableCell>
                                    <TableCell align="left" className="totals">Monday</TableCell>
                                    <TableCell align="left" className="totals">Tuesday</TableCell>
                                    <TableCell align="left" className="totals">Wednesday</TableCell>
                                    <TableCell align="left" className="totals">Thursday</TableCell>
                                    <TableCell align="left" className="totals">Friday</TableCell>
                                    <TableCell align="left" className="totals">Saturday</TableCell>
                                    <TableCell align="left" className="totals">Sunday</TableCell>
                                </TableRow>
                                {/* {h.habits.map((e, index) => */}
                                <TableRow
                                    tabIndex={-1}
                                // key={index}
                                >
                                    <TableCell align="left">Date</TableCell>
                                    <TableCell align="left">01/08/21</TableCell>
                                    <TableCell align="left">01/08/21</TableCell>
                                    <TableCell align="left">01/08/21</TableCell>
                                    <TableCell align="left">01/08/21</TableCell>
                                    <TableCell align="left">01/08/21</TableCell>
                                    <TableCell align="left">01/08/21</TableCell>
                                    <TableCell align="left">01/08/21</TableCell>
                                </TableRow>
                                {/* )} */}
                                <TableRow>
                                    <TableCell>Week</TableCell>
                                    <TableCell>data</TableCell>
                                    <TableCell>data</TableCell>
                                    <TableCell>data</TableCell>
                                    <TableCell>data</TableCell>
                                    <TableCell>data</TableCell>
                                    <TableCell>data</TableCell>
                                    <TableCell>data</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Scrollbar>
                </Card>
                {/* }) */}
                {/* : <NoData /> */}
                {/* } */}
            </Container>
        </>
    );
}
