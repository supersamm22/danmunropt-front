// material
import {
    Card,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Container,
    TableHead,
    Button,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { isLoggedIn } from '../../helpers/loginHelp';
import { addPeriodization, getPeriodization } from '../../apiCalls/reportCalls';
import Scrollbar from '../Scrollbar';
import Loading from '../Loading';
import NoData from '../NoData';
import { fDate, addDays, startOfWeek } from 'src/utils/formatTime';
import { useForm } from 'react-hook-form';

export default function PeriodizationTable({ id }) {
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");
    const [periodizations, setPeriodization] = useState([]);

    useEffect(() => {
        const token_ = isLoggedIn();
        console.log(token_)
        setPeriodization([])
        setLoading(true)
        setError("")
        getPeriodization(token_.token, id).then(data => {
            if (data && Array.isArray(data) && data.length > 0) {
                setPeriodization(data)
                setLoading(false)
            } else {
                // setError("Unable to get periodization data")
                setLoading(false)
            }
        })
    }, [id])
    const submit = (e) => {
        setSending(true)
        setError("")
        // setSuccess(false)
        const loginData = isLoggedIn()
        addPeriodization(loginData.token, e).then(data => {
            if (data) {
                setSending(false)
                setError("")
                // setSuccess(true)
            } else {
                setSending(false)
                setError("Something went wrong")
                // setSuccess(false)
            }
        })
    }

    if (loading) {
        return <Loading />
    }
    return (
        <>
            {error &&
                <div className="alert alert-danger text-center m-3" role="alert" style={{ color: "#dc004e" }}>
                    {error}
                </div>
            }
            {(periodizations && Array.isArray(periodizations) && periodizations.length > 0) ?
                periodizations.map((p, index) => {
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
                                        </TableRow>
                                        <TableRow tabIndex={-1} >
                                            <TableCell align="left">Date</TableCell>
                                            <TableCell align="left">{fDate(addDays(start_, 0))}</TableCell>
                                            <TableCell align="left">{fDate(addDays(start_, 1))}</TableCell>
                                            <TableCell align="left">{fDate(addDays(start_, 2))}</TableCell>
                                            <TableCell align="left">{fDate(addDays(start_, 3))}</TableCell>
                                            <TableCell align="left">{fDate(addDays(start_, 4))}</TableCell>
                                            <TableCell align="left">{fDate(addDays(start_, 5))}</TableCell>
                                            <TableCell align="left">{fDate(addDays(start_, 6))}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Weight in kg</TableCell>
                                            <TableCell>{p.monday}</TableCell>
                                            <TableCell>{p.tuesday}</TableCell>
                                            <TableCell>{p.wednesday}</TableCell>
                                            <TableCell>{p.thursday}</TableCell>
                                            <TableCell>{p.friday}</TableCell>
                                            <TableCell>{p.saturday}</TableCell>
                                            <TableCell>{p.sunday}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Notes</TableCell>
                                            <td class="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-429m73-MuiTableCell-root" colSpan="7">
                                                <form onSubmit={handleSubmit((e) => {
                                                    const n = e[p._id + "_notes"]
                                                    p.notes = n
                                                    submit(p)
                                                })} id={"form" + index} key={"key" + index}>
                                                    <input className="form-control" type="text"
                                                        {...register(p._id + "_notes", { required: false, value: p.notes })}
                                                        style={{ width: "80%", display: "inline-block" }} />
                                                    <Button
                                                        style={{ marginLeft: 10 }}
                                                        className="btn"
                                                        variant="link"
                                                        size="xs"
                                                        type="submit"
                                                        disabled={sending}
                                                    >Update</Button>
                                                </form>
                                            </td>
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
