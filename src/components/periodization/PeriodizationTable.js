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
            <Container className="mt-4">
                <Card className="card-padding">
                    <Scrollbar>

                        {(periodizations && Array.isArray(periodizations) && periodizations.length > 0) ?
                            periodizations.map((p, index) =>

                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ fontWeight: 600, fontSize: "1.5rem" }}>Periodization</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="left" className="totals">Week {index}</TableCell>
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
                                            <TableCell align="left">01/08/21</TableCell>
                                            <TableCell align="left">01/08/21</TableCell>
                                            <TableCell align="left">01/08/21</TableCell>
                                            <TableCell align="left">01/08/21</TableCell>
                                            <TableCell align="left">01/08/21</TableCell>
                                            <TableCell align="left">01/08/21</TableCell>
                                            <TableCell align="left">01/08/21</TableCell>
                                            <TableCell align="left"></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell>{p.monday}</TableCell>
                                            <TableCell>data</TableCell>
                                            <TableCell>data</TableCell>
                                            <TableCell>data</TableCell>
                                            <TableCell>data</TableCell>
                                            <TableCell>data</TableCell>
                                            <TableCell>data</TableCell>
                                            <TableCell>{p.notes}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            )
                            : <NoData />
                        }
                    </Scrollbar>
                </Card>
            </Container>
        </>
    );
}
