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
import { useEffect, useState } from 'react';
import { getNutrition } from 'src/apiCalls/reportCalls';
import { isLoggedIn } from 'src/helpers/loginHelp';
import Scrollbar from '../Scrollbar';
import { UserListHead } from '../_dashboard/user';

const TABLE_HEAD = [
    { id: 'meal', label: 'Meal Time', alignRight: false },
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

export default function NutritionTable({ id }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [nutritions, setNutrition] = useState([]);

    useEffect(() => {
        const token_ = isLoggedIn();
        setLoading(true)
        setNutrition([])
        getNutrition(token_.token, id).then(data => {
            console.log(data)
            if (data && Array.isArray(data) && data.length > 0) {
                setNutrition(data)
                setLoading(false)
            } else {
                setError("Unable to get nutrition data")
                setLoading(false)
            }
        })
    }, [id])
    if (loading) {
        return "loading"
    }
    return (
        <>
            <Container className="mt-4">
                {nutritions.map((nutrition, index) =>
                    <Card className="mt-4" key={index}>
                        <Scrollbar>
                            <TableContainer sx={{ minWidth: 800 }}>
                                <Table >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nutritian</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow hover>
                                            <TableCell className="totals" style={{ borderBottom: "none" }}>Wake Up Time:{" "}{nutrition.wake_up}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="totals">Meal Time</TableCell>
                                            <TableCell className="totals">Steak</TableCell>
                                            <TableCell className="totals">Calories</TableCell>
                                            <TableCell className="totals">Protein</TableCell>
                                            <TableCell className="totals">Carbohydrates</TableCell>
                                            <TableCell className="totals">Fats</TableCell>
                                            <TableCell className="totals">Comments</TableCell>
                                        </TableRow>
                                        {nutrition.meals.map((e, index) => {
                                            return <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={index}>
                                                <TableCell align="left">{e.time}</TableCell>
                                                <TableCell align="left">{e.steak}</TableCell>
                                                <TableCell align="left">{e.calories}</TableCell>
                                                <TableCell align="left">{e.protein}</TableCell>
                                                <TableCell align="left">{e.carbohydrates}</TableCell>
                                                <TableCell align="left">{e.fats}</TableCell>
                                                <TableCell align="left">{e.comment}</TableCell>
                                            </TableRow>
                                        }
                                        )}


                                        {/* <Typography variant="h6" id="tableTitle" component="div" px={2} my={2}>
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
                                            </TableRow> */}
                                        <TableRow hover>
                                            <TableCell className="totals">Water and  Alcohol Intake</TableCell>
                                        </TableRow>
                                        <TableRow hover>
                                            <TableCell>How many litres of Water did you consume today?</TableCell>
                                            <TableCell>{nutrition.water}</TableCell>
                                        </TableRow>
                                        <TableRow hover>
                                            <TableCell>Did you consume any Alcohol today? (Yes/No)</TableCell>
                                            <TableCell>{nutrition.alcohol}</TableCell>
                                        </TableRow>
                                        <TableRow hover>
                                            <TableCell>If Yes - please detail what you consumed:</TableCell>
                                            <TableCell>{nutrition.alcohol_datail}</TableCell>
                                        </TableRow>
                                        <TableRow hover>
                                            <TableCell>Total Alcoholic Cal consumption today:</TableCell>
                                            <TableCell>{nutrition.alcohol_cal}</TableCell>
                                        </TableRow>
                                        <TableRow hover>
                                            <TableCell>Daily Comments:</TableCell>
                                            <TableCell>{nutrition.comment}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Scrollbar>
                    </Card>
                )}

            </Container>
        </>
    );
}
