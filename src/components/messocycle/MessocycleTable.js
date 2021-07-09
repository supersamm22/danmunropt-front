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
import { useState } from 'react';
import MessocycleForm from './MessocycleForm';
// components
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'exercise', label: 'Exercise', alignRight: false },
    { id: 'sets', label: 'Sets', alignRight: false },
    { id: 'reps', label: 'Reps', alignRight: false },
    { id: 'load', label: 'Load', alignRight: false },
    { id: 'rest', label: 'Rest', alignRight: false },
    { id: 'tempo', label: 'Tempo', alignRight: false },
    { id: 'notes', label: 'Notes', alignRight: false },
    { id: 'totalreps', label: 'Total Volume(Reps)', alignRight: false },
    { id: 'totalLoad', label: 'Total Load(kg)', alignRight: false },
];
const DATA = [
    { exercise: "Bicep Curl", sets: "4", reps: "12", load: "32kg", rest: "60", tempo: "3:1:3:1", notes: "", totalVolume: "48", totalLoad: "1536kg" },
    { exercise: "Chest Press", sets: "4", reps: "12", load: "39kg", rest: "60", tempo: "3:1:3:1", notes: "", totalVolume: "48", totalLoad: "1872kg" },
    { exercise: "Vertical Row", sets: "4", reps: "12", load: "52kg", rest: "60", tempo: "3:1:3:1", notes: "", totalVolume: "48", totalLoad: "2496kg" },
    { exercise: "Shoulder Press", sets: "4", reps: "12", load: "25kg", rest: "60", tempo: "3:1:3:1", notes: "", totalVolume: "48", totalLoad: "1200kg" },
    { exercise: "Lat Pull Down(Machine)", sets: "4", reps: "12", load: "52kg", rest: "60", tempo: "3:1:3:1", notes: "", totalVolume: "48", totalLoad: "2496kg" },
    { exercise: "Tricep Press", sets: "4", reps: "12", load: "42kg", rest: "60", tempo: "3:1:3:1", notes: "", totalVolume: "48", totalLoad: "2016kg" },
    { exercise: "Low Row", sets: "4", reps: "12", load: "35kg", rest: "60", tempo: "3:1:3:1", notes: "", totalVolume: "48", totalLoad: "1680kg" },
    { exercise: "Lat Pull Down(Cable)", sets: "4", reps: "8", load: "35kg", rest: "60", tempo: "3:1:3:1", notes: "", totalVolume: "32", totalLoad: "1120kg" },
    { exercise: "Pec Fly", sets: "4", reps: "10", load: "32kg", rest: "60", tempo: "3:1:3:1", notes: "", totalVolume: "40", totalLoad: "1280kg" },
    { exercise: "Rear Delt", sets: "4", reps: "10", load: "32kg", rest: "60", tempo: "3:1:3:1", notes: "", totalVolume: "40", totalLoad: "1280kg" },
    { exercise: "Tricep Extension w / Rope", sets: "4", reps: "12", load: "32kg", rest: "60", tempo: "3:1:3:1", notes: "", totalVolume: "48", totalLoad: "1536kg" }
]
// ----------------------------------------------------------------------

export default function MessocycleTable() {
    const [open, setOpen] = useState(false)

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
                            <Table>
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
                                <TableRow>
                                    <TableCell className="totals">Warm Up:</TableCell>
                                    <TableCell>78</TableCell>
                                </TableRow>
                                <UserListHead
                                    headLabel={TABLE_HEAD}
                                />
                                <TableBody>
                                    {DATA.map((e, index) => {
                                        return <TableRow
                                            hover
                                            tabIndex={-1}
                                            role="checkbox"
                                            key={index}
                                        >
                                            <TableCell align="left">{e.exercise}</TableCell>
                                            <TableCell align="left">{e.sets}</TableCell>
                                            <TableCell align="left">{e.reps}</TableCell>
                                            <TableCell align="left">{e.load}</TableCell>
                                            <TableCell align="left">{e.rest}</TableCell>
                                            <TableCell align="left">{e.tempo}</TableCell>
                                            <TableCell align="left">{e.notes}</TableCell>
                                            <TableCell align="left">{e.totalVolume}</TableCell>
                                            <TableCell align="left">{e.totalLoad}</TableCell>
                                        </TableRow>
                                    }
                                    )}
                                    <TableRow>
                                        <TableCell className="totals">Cool Down:</TableCell>
                                        <TableCell>2kg run</TableCell>
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
