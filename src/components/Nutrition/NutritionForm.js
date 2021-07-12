import Icon from '@iconify/react';
import { Button, Card, Container, IconButton } from '@material-ui/core';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { addNutrition, getNutrition } from '../../apiCalls/reportCalls';
import { isLoggedIn } from "../../helpers/loginHelp"
import NutritionTable from './NutritionTable';
import Loading from '../Loading';

export default function NutritionForm(props) {

    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [sending, setSending] = useState(false);
    const [array, setArray] = useState([0, 1]);
    const [nutrition, setNutrition] = useState({});

    useEffect(() => {
        const token_ = isLoggedIn();
        setLoading(true)
        setNutrition([])
        getNutrition(token_.token, token_.user.id).then(data => {
            if (data && Array.isArray(data) && data.length > 0) {
                const s = []
                data[0].meals.forEach((e, index) => {
                    s.push(index)
                })
                s.push(s.length)
                setArray(s)
                setNutrition(data[0])
                setLoading(false)
            } else {
                // setError("Unable to get nutrition data")
                setLoading(false)
            }
        })
    }, [props])
    const submit = (e) => {
        console.log("asd")
        setSending(true)
        setError("")
        setSuccess(false)
        const meals = []
        array.forEach((num) => {
            const newM = {
                "time": e[num + "_time"], "steak": e[num + "_steak"], "calories": e[num + "_calories"],
                "protein": e[num + "_protein"], "carbohydrates": e[num + "_carbohydrates"], "fats": e[num + "_fats"], "comment": e[num + "_comment"]
            }
            const { time, steak, calories, protein, carbohydrates, fats, comment } = newM
            if (time, (steak || calories || protein || carbohydrates || fats || comment)) {
                meals.push(newM)
            }
        })
        const loginData = isLoggedIn()
        const parms = {
            wake_up: e.wake_up,
            water: e.water,
            alcohol: e.alcohol,
            alcohol_detail: e.alcohol_detail,
            alcohol_cal: e.alcohol_cal,
            comment: e.comment,
            userId: loginData.user.id,
            meals: meals,
        }
        addNutrition(loginData.token, parms).then(data => {
            if (data) {
                setSending(false)
                setError("")
                setSuccess(true)
            } else {
                setSending(false)
                setError("Something went wrong")
                setSuccess(false)
            }
        })
    }
    const total = {
        calories: 0, protein: 0, carbohydrates: 0, fats: 0
    }
    if (loading) {
        return <Loading />
    }
    return (
        <Container className="mt-4">
            <Card>
                <Container>
                    <h4 className="mt-2">Nutrition</h4>
                    <form onSubmit={handleSubmit(submit)} >
                        <div>
                            <div className="row">
                                <div className="col-lg-2 col-xl-1 col-sm-2">
                                    <div className="form-group ">
                                        <label className="text-muted">Wake Up</label>
                                        <input className="form-control"
                                            type="time"  {...register("wake_up", { required: false, value: nutrition.wake_up })} />
                                    </div>
                                </div>
                                <div className="col-lg-2 col-xl-1 col-sm-2">
                                    <div className="form-group">
                                        <label className="text-muted">Water Intake</label>
                                        <input className="form-control" type="text"  {...register("water", { required: false, value: nutrition.water })} />
                                    </div>
                                </div>
                                <div className="col-lg-2 col-xl-2 col-sm-2">
                                    <div className="form-group">
                                        <label className="text-muted">Consumed Alcohol</label>
                                        <select className="form-control" {...register("alcohol", { required: false, value: NutritionTable.alcohol })}>
                                            <option value="">Select...</option>
                                            <option value="Compliant">Yes</option>
                                            <option value="Non-Compliant">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-xl-2 col-sm-2">
                                    <div className="form-group">
                                        <label className="text-muted">consumed details</label>
                                        <input className="form-control" type="text"  {...register("alcohol_datail", { required: false, value: nutrition.alcohol_detail })} />
                                    </div>
                                </div>
                                <div className="col-lg-2 col-xl-2 col-sm-2">
                                    <div className="form-group">
                                        <label className="text-muted">Total Alcoholic Cal</label>
                                        <input className="form-control" type="text"  {...register("alcohol_cal", { required: false, value: nutrition.alcohol_cal })} />
                                    </div>
                                </div>
                                <div className="col-lg-2 col-xl-3 col-sm-2">
                                    <div className="form-group">
                                        <label className="text-muted">Daily Comments</label>
                                        <input className="form-control" type="text"{...register("comment", { required: false, value: nutrition.comment })} />
                                    </div>
                                </div>
                            </div>
                            {array.map((num, index) => {
                                const meal = (nutrition.meals || [])[index] || {}
                                total.protein = total.protein || 0 + (meal.protein || 0)
                                total.calories = total.calories || 0 + (meal.calories || 0)
                                total.carbohydrates = total.carbohydrates || 0 + (meal.carbohydrates || 0)
                                total.fats = total.fats || 0 + (meal.fats || 0)
                                return (
                                    <div className="row" key={index}>
                                        <div className="col-lg-2 col-xl-1 col-sm-2">
                                            <div className="form-group ">
                                                <label className="text-muted">Meal Time</label>
                                                <input className="form-control"
                                                    type="time" {...register(num + "_time", { required: false, value: meal.time })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-xl-2 col-sm-2">
                                            <div className="form-group">
                                                <label className="text-muted">Meal</label>
                                                <input className="form-control" type="text"  {...register(num + "_steak", { required: false, value: meal.steak })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-xl-1 col-sm-2">
                                            <div className="form-group">
                                                <label className="text-muted">Calories</label>
                                                <input className="form-control" type="number" {...register(num + "_calories", { required: false, value: meal.calories })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-xl-1 col-sm-2">
                                            <div className="form-group">
                                                <label className="text-muted">Protein</label>
                                                <input className="form-control" type="number"  {...register(num + "_protein", { required: false, value: meal.protein })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-xl-2 col-sm-2">
                                            <div className="form-group">
                                                <label className="text-muted">Carbohydrates</label>
                                                <input className="form-control" type="number"  {...register(num + "_carbohydrates", { required: false, value: meal.carbohydrates })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-xl-1 col-sm-2">
                                            <div className="form-group">
                                                <label className="text-muted">Fats</label>
                                                <input className="form-control" type="number"  {...register(num + "_fats", { required: false, value: meal.fats })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-xl-3 col-sm-2">
                                            <div className="form-group">
                                                <label className="text-muted">Comment</label>
                                                <input className="form-control" type="text"  {...register(num + "_comment", { required: false, value: meal.comment })} />
                                            </div>
                                        </div>

                                        <div className="col-lg-3 col-xl-1 col-sm-4">
                                            <IconButton sx={{ mt: 2, color: 'text.primary' }}
                                                onClick={() => {
                                                    const filterArray = array.filter((e) => e !== num)
                                                    setArray(filterArray)
                                                }}
                                                className="btn btn-dlt"
                                                aria-label="delete">
                                                <Icon icon={trash2Fill} />
                                            </IconButton>
                                        </div>
                                    </div>
                                )
                            }
                            )}
                            <div className="row">
                                <div className="col-lg-2 col-xl-3 col-sm-2 mt-3">
                                    <Button
                                        onClick={() => {
                                            array.push(Math.floor(Math.random() * 100))
                                            setArray(array.filter(() => true))
                                        }}
                                        className="btn"
                                        disabled={sending}
                                        variant="contained"
                                        type="button"
                                    >Add Nutrition</Button>
                                </div>
                                <div className="col-lg-2 col-xl-1 col-sm-2">
                                    <div className="form-group">
                                        <label className="text-muted">Calories</label>
                                        <input className="form-control " disabled
                                            type="number" value={total.calories} />
                                    </div>
                                </div>
                                <div className="col-lg-2 col-xl-1 col-sm-2">
                                    <div className="form-group">
                                        <label className="text-muted">Protein</label>
                                        <input className="form-control" disabled type="number"
                                            value={total.protein} />
                                    </div>
                                </div><div className="col-lg-2 col-xl-2 col-sm-22">
                                    <div className="form-group">
                                        <label className="text-muted">Carbohydrates</label>
                                        <input className="form-control" disabled
                                            type="number" value={total.carbohydrates} />
                                    </div>
                                </div>
                                <div className="col-lg-2 col-xl-1 col-sm-2">
                                    <div className="form-group">
                                        <label className="text-muted">Fats</label>
                                        <input className="form-control" disabled
                                            type="number" value={total.fats} />
                                    </div>
                                </div>
                            </div>


                            {/* end of main row */}
                            {loading &&
                                <div className="alert alert-primary text-center m-3 " role="alert">
                                    Uploading Nutrition....
                                </div>
                            }

                            {error && <div className="alert alert-danger text-center m-3" role="alert" style={{ color: "#dc004e" }}>
                                {error}
                            </div>
                            }
                            {success &&
                                <div className="alert alert-success text-center m-3" role="alert" style={{ color: "#102770" }}>
                                    Updated Succesfully
                                </div>
                            }
                        </div>
                        {/* <div className="col-md-12"> */}
                        <div className="row">
                            <div className="col-12 mt-2 p-0" style={{ textAlign: 'right' }}>
                                <Button
                                    disabled={sending}
                                    className="btn"
                                    variant="contained"
                                    type="submit"
                                >Save</Button>
                            </div>

                        </div>
                        {/* </div> */}

                    </form >
                </Container>
            </Card>
        </Container >
    );
}