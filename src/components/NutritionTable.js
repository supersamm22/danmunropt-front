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
    TableFooter,
} from '@material-ui/core';
import { UserListHead } from './_dashboard/user';
import Scrollbar from './Scrollbar';
import { useState } from 'react';
import Page from './Page';
// components
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'mealnum', label: 'No.', alignRight: false },
    { id: 'mealtime', label: 'Meal Time', alignRight: false },
    { id: 'steak', label: 'Steak', alignRight: false },
    { id: 'calories', label: 'Calories', alignRight: false },
    { id: 'protein', label: 'Protein', alignRight: false },
    { id: 'carbohydrates', label: 'Carbohydrates', alignRight: false },
    { id: 'fats', label: 'Fats', alignRight: false },

];
const DATA = [
    { number: 1, mealtime: "8:00", steak: "steak", calories: "cal", protein: "pro", carbohydrates: "carbo", fats: "fat" },
]
// ----------------------------------------------------------------------

export default function NutritionTable() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Page title="Nutrition | Minimal-UI">
                <Container>
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
                                                <TableCell align="left">{e.number}</TableCell>
                                                <TableCell align="left">{e.mealtime}</TableCell>
                                                <TableCell align="left">{e.steak}</TableCell>
                                                <TableCell align="left">{e.calories}</TableCell>
                                                <TableCell align="left">{e.protein}</TableCell>
                                                <TableCell align="left">{e.carbohydrates}</TableCell>
                                                <TableCell align="left">{e.fats}</TableCell>
                                            </TableRow>
                                        }
                                        )}

                                        <TableRow style={{ height: 53 }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    </TableBody>
                                    <TableFooter>
                                        <Typography variant="h6" id="tableTitle" component="div" px={4} py={2}>
                                            Daily Totals
                                        </Typography>

                                    </TableFooter>
                                </Table>
                            </TableContainer>
                        </Scrollbar>
                    </Card>
                </Container>
            </Page>
        </>
    );
}
