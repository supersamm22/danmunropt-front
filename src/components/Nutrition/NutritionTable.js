// material
import {
    Card,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Container,
    TableHead,
} from '@material-ui/core';
import { array } from 'prop-types';
import { useEffect, useState } from 'react';
import { getNutrition } from 'src/apiCalls/reportCalls';
import { isLoggedIn } from 'src/helpers/loginHelp';
import Loading from '../Loading';
import NoData from '../NoData';
import Scrollbar from '../Scrollbar';

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
        return <Loading />
    }
    return (
        <>
            <Container className="mt-4">
                {(nutritions && Array.isArray(nutritions) && nutritions.length > 0) ?
                    nutritions.map((nutrition, index) =>
                        <Card className="mt-4" key={index}>
                            <Scrollbar>
                                <Table >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ fontWeight: 600, fontSize: "1.5rem" }}>Nutrition</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Wake Up Time:{" "}{nutrition.wake_up}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="totals">Meal Time</TableCell>
                                            <TableCell className="totals">Meal</TableCell>
                                            <TableCell className="totals">Calories</TableCell>
                                            <TableCell className="totals">Protein</TableCell>
                                            <TableCell className="totals">Carbohydrates</TableCell>
                                            <TableCell className="totals">Fats</TableCell>
                                            <TableCell className="totals">Comments</TableCell>
                                        </TableRow>
                                        {nutrition.meals.map((e, index) => {
                                            return <TableRow
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
                                            return <TableRow key={index} >
                                                <TableCell>{e.calories_}</TableCell>
                                                <TableCell>{e.protein_}</TableCell>
                                                <TableCell>{e.carbohydrates_}</TableCell>
                                                <TableCell>{e.fats_}</TableCell>
                                            </TableRow> */}
                                    </TableBody>
                                </Table>
                                <Table>
                                    <TableHead>
                                        <TableRow><TableCell className="empty"></TableCell></TableRow>
                                        <TableRow >
                                            <TableCell className="totals table-heading">Water and  Alcohol Intake</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow >
                                            <TableCell className="totals">How many litres of Water did you consume today?</TableCell>
                                            <TableCell>{nutrition.water}</TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell className="totals">Did you consume any Alcohol today? (Yes/No)</TableCell>
                                            <TableCell>{nutrition.alcohol}</TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell className="totals">If Yes - please detail what you consumed:</TableCell>
                                            <TableCell>{nutrition.alcohol_datail}</TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell className="totals">Total Alcoholic Cal consumption today:</TableCell>
                                            <TableCell>{nutrition.alcohol_cal}</TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell className="totals">Daily Comments:</TableCell>
                                            <TableCell>{nutrition.comment}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Scrollbar>
                        </Card>
                    )
                    : <NoData />
                }

            </Container>
        </>
    );
}
