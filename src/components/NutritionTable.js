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
import { UserListHead } from './_dashboard/user';
import Scrollbar from './Scrollbar';
import { useState } from 'react';

const TABLE_HEAD = [
    { id: 'mealtime', label: 'Meal Time', alignRight: false },
    { id: 'steak', label: 'Steak', alignRight: false },
    { id: 'calories', label: 'Calories', alignRight: false },
    { id: 'protein', label: 'Protein', alignRight: false },
    { id: 'carbohydrates', label: 'Carbohydrates', alignRight: false },
    { id: 'fats', label: 'Fats', alignRight: false },
    { id: 'comments', label: 'Comments', alignRight: false },

];
const Total = [
    { calories_: "10", protein_: "10", carbohydrates_: "10", fats_: "10" }
]
const DATA = [
    { mealtime: "8:00", steak: "steak", calories: "cal", protein: "pro", carbohydrates: "carbo", fats: "fat", comments: "comments" },
]
// ----------------------------------------------------------------------

export default function NutritionTable() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Container className="mt-4">
                <Card>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <TableHead>
                                    <Typography variant="h6" id="tableTitle" component="div" px={2} py={2}>
                                        Nutritian
                                    </Typography>
                                </TableHead>
                                <TableRow hover>
                                    <TableCell className="totals" style={{ borderBottom: "none" }}>Wake Up Time:</TableCell>
                                    <TableCell style={{ borderBottom: "none" }}>6:00am</TableCell>
                                </TableRow>
                                <UserListHead
                                    headLabel={TABLE_HEAD}
                                />
                                <TableBody>
                                    {DATA.map((e, index) => {
                                        return <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={index}>
                                            <TableCell align="left">{e.mealtime}</TableCell>
                                            <TableCell align="left">{e.steak}</TableCell>
                                            <TableCell align="left">{e.calories}</TableCell>
                                            <TableCell align="left">{e.protein}</TableCell>
                                            <TableCell align="left">{e.carbohydrates}</TableCell>
                                            <TableCell align="left">{e.fats}</TableCell>
                                            <TableCell align="left">{e.comments}</TableCell>
                                        </TableRow>
                                    }
                                    )}


                                    <Typography variant="h6" id="tableTitle" component="div" px={2} my={2}>
                                        Daily Totals
                                    </Typography>
                                    <TableRow >
                                        <TableCell className="totals">Calories</TableCell>
                                        <TableCell className="totals">Protein</TableCell>
                                        <TableCell className="totals">Carbohydrates</TableCell>
                                        <TableCell className="totals">Fats</TableCell>
                                    </TableRow>
                                    {Total.map((e, index) => {
                                        return <TableRow key={index} hover>
                                            <TableCell>{e.calories_}</TableCell>
                                            <TableCell>{e.protein_}</TableCell>
                                            <TableCell>{e.carbohydrates_}</TableCell>
                                            <TableCell>{e.fats_}</TableCell>
                                        </TableRow>
                                    }
                                    )}


                                    <Typography variant="h6" id="tableTitle" component="div" px={2} my={2}>
                                        Water and  Alcohol Intake
                                    </Typography>
                                    <TableRow hover>
                                        <TableCell>How many litres of Water did you consume today?</TableCell>
                                        <TableCell>98</TableCell>
                                    </TableRow>
                                    <TableRow hover>
                                        <TableCell>Did you consume any Alcohol today? (Yes/No)</TableCell>
                                        <TableCell>yes</TableCell>
                                    </TableRow>
                                    <TableRow hover>
                                        <TableCell>If Yes - please detail what you consumed:</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow hover>
                                        <TableCell>Total Alcoholic Cal consumption today:</TableCell>
                                        <TableCell>98</TableCell>
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
