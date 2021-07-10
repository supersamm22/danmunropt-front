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

export default function MessocycleTable({ id }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [messocycles, setMessocycle] = useState([]);


    useEffect(() => {
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
    }, [id])
    if (loading) {
        return "loading"
    }
    return (
        <>
            {
                open &&
                <MessocycleForm open={open} onClose={() => { setOpen(false) }} />

            }
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4" gutterBottom>
                        Admin
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

                <Card>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            {messocycles.map((messocycle, index) =>
                                <Table key={index}>
                                    <TableHead>
                                        <Typography variant="h6" id="tableTitle" component="div" px={4} py={2}>
                                            User1
                                            <Tooltip title="Delete" >
                                                <IconButton aria-label="delete">
                                                    <Icon icon={trash2Fill} />
                                                </IconButton>
                                            </Tooltip>
                                        </Typography>
                                    </TableHead>

                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="totals">Warm Up:{" "}{messocycle.warm_up}</TableCell>
                                            <TableCell className="totals">Cool Down:{" "}{messocycle.cool_down}</TableCell>
                                            <TableCell className="totals">Cool Down:</TableCell>
                                            <TableCell>2kg run</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Exercise</TableCell>
                                            <TableCell>Sets</TableCell>
                                            <TableCell >Reps</TableCell>
                                            <TableCell>Load</TableCell>
                                            <TableCell>Rest</TableCell>
                                            <TableCell>Tempo</TableCell>
                                            <TableCell colSpan={8}>Notes</TableCell>
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
                                        <TableRow>
                                        </TableRow>

                                    </TableBody>

                                </Table>
                            )}
                        </TableContainer>
                    </Scrollbar>
                </Card>
            </Container>
        </>
    );
}
