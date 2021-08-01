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
import { getPeriodization } from '../../apiCalls/reportCalls';
import Scrollbar from '../Scrollbar';
import Loading from '../Loading';
import NoData from '../NoData';
import { fDate, addDays, startOfWeek } from 'src/utils/formatTime';

export default function PeriodizationTable({ id }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [periodizations, setPeriodization] = useState([]);

    useEffect(() => {
        const token_ = isLoggedIn();
        console.log(token_)
        setPeriodization([])
        setLoading(true)
        getPeriodization(token_.token, id).then(data => {
            if (data && Array.isArray(data) && data.length > 0) {
                setPeriodization(data)
                setLoading(false)
            } else {
                setError("Unable to get periodization data")
                setLoading(false)
            }
        })
    }, [id])

    if (loading) {
        return <Loading />
    }
    console.table(periodizations)
    return (
        <>

            {(periodizations && Array.isArray(periodizations) && periodizations.length > 0) ?
                periodizations.map((p, index) => {
                    console.log(p)
                    const start_ = startOfWeek(p.week, p.year)
                    return (<Container className="mt-4">
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
                                            <TableCell align="left" className="totals">Week {index + 1}</TableCell>
                                            <TableCell align="left" className="totals">Monday</TableCell>
                                            <TableCell align="left" className="totals">Tuesday</TableCell>
                                            <TableCell align="left" className="totals">Wednesday</TableCell>
                                            <TableCell align="left" className="totals">Thursday</TableCell>
                                            <TableCell align="left" className="totals">Friday</TableCell>
                                            <TableCell align="left" className="totals">Saturday</TableCell>
                                            <TableCell align="left" className="totals">Sunday</TableCell>
                                            <TableCell align="left" className="totals">Notes</TableCell>
                                        </TableRow>
                                        <TableRow
                                            tabIndex={-1}
                                        >
                                            <TableCell align="left">Date</TableCell>
                                            <TableCell align="left">{fDate(addDays(start_, 0))}</TableCell>
                                            <TableCell align="left">{fDate(addDays(start_, 1))}</TableCell>
                                            <TableCell align="left">{fDate(addDays(start_, 2))}</TableCell>
                                            <TableCell align="left">{fDate(addDays(start_, 3))}</TableCell>
                                            <TableCell align="left">{fDate(addDays(start_, 4))}</TableCell>
                                            <TableCell align="left">{fDate(addDays(start_, 5))}</TableCell>
                                            <TableCell align="left">{fDate(addDays(start_, 6))}</TableCell>
                                            <TableCell align="left"></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Weight</TableCell>
                                            <TableCell>{p.monday}</TableCell>
                                            <TableCell>{p.tuesday}</TableCell>
                                            <TableCell>{p.wednesday}</TableCell>
                                            <TableCell>{p.thursday}</TableCell>
                                            <TableCell>{p.friday}</TableCell>
                                            <TableCell>{p.saturday}</TableCell>
                                            <TableCell>{p.sunday}</TableCell>
                                            <TableCell>{p.notes}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Scrollbar>
                        </Card>
                    </Container>
                    )
                })
                : <NoData />
            }
        </>
    );
}
