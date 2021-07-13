// material
import {
    Card,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Container,
    TableHead,
    Typography,
} from '@material-ui/core';
import { array } from 'prop-types';
import { useEffect, useState } from 'react';
import { getNutrition } from 'src/apiCalls/reportCalls';
import { isLoggedIn } from 'src/helpers/loginHelp';
import { fDate } from 'src/utils/formatTime';
import Loading from '../Loading';
import NoData from '../NoData';
import Scrollbar from '../Scrollbar';

// ----------------------------------------------------------------------

export default function NutritionTable({ id }) {
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
                    nutritions.map((nutrition, index) => {
                        const total = {
                            protein: 0, carbohydrates: 0, calories: 0, fats: 0
                        }
                        nutrition.meals.forEach((nt, index) => {
                            total.calories = total.calories + (nt.calories || 0)
                            total.protein = total.protein + (nt.protein || 0)
                            total.carbohydrates = total.carbohydrates + (nt.carbohydrates || 0)
                            total.fats = total.fats + (nt.fats || 0)
                        })
                        return <Card className="mt-4 card-padding" key={index}>
                            <Scrollbar>
                                <Table >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ fontWeight: 600, fontSize: "1.5rem", padding: 8, borderBottom: "none" }}>Nutrition{" "}<span style={{ fontSize: 16 }}>{nutrition.date || fDate()}</span></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ padding: 0 }} colSpan={4}>Wake Up Time:{" "}{nutrition.wake_up}</TableCell>
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
                                        <TableRow>
                                            <TableCell colSpan={2} className="totals">Totals</TableCell>
                                            <TableCell>{total.calories}</TableCell>
                                            <TableCell>{total.protein}</TableCell>
                                            <TableCell>{total.carbohydrates}</TableCell>
                                            <TableCell>{total.fats}</TableCell>
                                            <TableCell>--</TableCell>
                                        </TableRow>

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
                                            <TableCell>{nutrition.alcohol || "No"}</TableCell>
                                        </TableRow>
                                        {nutrition.alcohol === "Yes" && <TableRow >
                                            <TableCell className="totals">If Yes - please detail what you consumed:</TableCell>
                                            <TableCell>{nutrition.alcohol_detail}</TableCell>
                                        </TableRow>
                                        }
                                        {nutrition.alcohol === "Yes" && <TableRow >
                                            <TableCell className="totals">Total Alcoholic Cal consumption today:</TableCell>
                                            <TableCell>{nutrition.alcohol_cal}</TableCell>
                                        </TableRow>}
                                        <TableRow >
                                            <TableCell className="totals">Daily Comments:</TableCell>
                                            <TableCell>{nutrition.comment}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Scrollbar>
                        </Card>
                    })
                    : <NoData />
                }

            </Container>
        </>
    );
}
