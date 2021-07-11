import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';

// material
import {
    Card,
    Table,
    Stack,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TableHead,
    Tooltip,
    TablePagination,
    IconButton,
} from '@material-ui/core';
import { UserListHead } from '../_dashboard/user';
import Scrollbar from '../Scrollbar';
import { useEffect, useState } from 'react';
import MessocycleForm from './MessocycleForm';
import { getMessocycle } from 'src/apiCalls/reportCalls';
import { isLoggedIn } from 'src/helpers/loginHelp';
import DeleteMessocycle from './DeleteMessocycle';

export default function MessocycleTable({ id }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [messocycles, setMessocycle] = useState([]);
    const [show, setShow] = useState(false);

    console.log(show)
    useEffect(() => {
        getmc()
    }, [id])
    const getmc = () => {
        const token_ = isLoggedIn();
        setMessocycle([])
        setLoading(true)

        getMessocycle(token_.token, id).then(data => {
            if (data && Array.isArray(data) && data.length > 0) {
                setMessocycle(data)
                setLoading(false)
            } else {
                setError("Unable to get messocycle data")
                setLoading(false)
            }
        })
    }
    if (loading) {
        return "loading"
    }
    return (
        <>
            {open && <MessocycleForm open={open} onClose={() => { setOpen(false) }} onSave={getmc} />}
            {show && <DeleteMessocycle show={show} onClose={() => { setShow(false) }} />}
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4" gutterBottom>
                    </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="#"
                        startIcon={<Icon icon={plusFill} />}
                        onClick={() => setOpen(true)}
                    >
                        Add
                    </Button>
                </Stack>
                {messocycles.map((messocycle, index) =>
                    <Card style={{ marginBottom: 16 }} key={index}>
                        <Scrollbar>
                            <Typography variant="h6" id="tableTitle" component="div">
                                <div className="row">
                                    <div className="col-md-6">
                                        {/* {messocycles.indexOf(messocycle) + 1} */}
                                    </div>
                                    <div className="col-md-6" style={{ textAlign: "end" }}>
                                        <Tooltip title="Delete" >
                                            <IconButton aria-label="delete"
                                                onClick={() => setShow(true)}
                                            >
                                                <Icon icon={trash2Fill} />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </div>
                            </Typography>

                            <Table key={index}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="totals">Warm Up:{" "}{messocycle.warm_up}</TableCell>
                                        <TableCell className="totals">Cool Down:{" "}{messocycle.cool_down}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="totals">Exercise</TableCell>
                                        <TableCell className="totals">Sets</TableCell>
                                        <TableCell className="totals">Reps</TableCell>
                                        <TableCell className="totals">Load</TableCell>
                                        <TableCell className="totals">Rest</TableCell>
                                        <TableCell className="totals">Tempo</TableCell>
                                        <TableCell className="totals">Notes</TableCell>
                                    </TableRow>
                                    {messocycle.exercises.map((e, index) => {
                                        return <TableRow
                                            hover
                                            tabIndex={-1}
                                            role="checkbox"
                                            key={index}
                                        >
                                            <TableCell align="left">{e.exercise}</TableCell>
                                            <TableCell align="left">{e.sets}</TableCell>
                                            <TableCell align="left" >{e.reps}</TableCell>
                                            <TableCell align="left">{e.load}</TableCell>
                                            <TableCell align="left">{e.rest}</TableCell>
                                            <TableCell align="left">{e.tempo}</TableCell>
                                            <TableCell align="left">{e.notes}</TableCell>
                                        </TableRow>
                                    }
                                    )}

                                </TableBody>

                            </Table>
                        </Scrollbar>
                    </Card>
                )}
            </Container>
        </>
    );
}
