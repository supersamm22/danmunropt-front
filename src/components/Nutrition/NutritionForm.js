import Icon from '@iconify/react';
import { Button, Card, Container, IconButton } from '@material-ui/core';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { addNutrition, getNutrition } from '../../apiCalls/reportCalls';
import { isLoggedIn } from "../../helpers/loginHelp"
import NutritionTable from './NutritionTable';

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
    if (loading) {
        return "loading"
    }

    const submit = (e) => {
        console.log("asd")
        setSending(true)
        setError("")
        setSuccess(false)
        const meals = []
        array.forEach((num) => {
            meals.push({
                "time": e[num + "_time"], "steak": e[num + "_steak"], "calories": e[num + "_calories"],
                "protein": e[num + "_protein"], "carbohydrates": e[num + "_carbohydrates"], "fats": e[num + "_fats"], "comment": e[num + "_comment"]
            })
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
    const total = {}

    return (
        <Container className="mt-4">
            <Card>
                <Container>
                    <form onSubmit={handleSubmit(submit)} >
                        <div>
                            <div className="row">
                                <div className="col-lg-2 col-xl-1 col-sm-2">
                                    <div className="form-group ">
                                        <label className="text-muted">Wake Up</label>
                                        <input className="form-control"
                                            type="text"{...register("wake_up", { required: true, value: nutrition.wake_up })} />
                                    </div>
                                </div>
                                <div className="col-lg-2 col-xl-2 col-sm-2">
                                    <div className="form-group">
                                        <label className="text-muted">Water Intake</label>
                                        <input className="form-control" type="text"  {...register("water", { required: true, value: nutrition.water })} />
                                    </div>
                                </div>
                                <div className="col-lg-2 col-xl-2 col-sm-2">
                                    <div className="form-group">
                                        <label className="text-muted">Did you consume Alcohol today</label>
                                        <select className="form-control" {...register("alcohol", { required: true, value: NutritionTable.alcohol })}>
                                            <option value="">Select...</option>
                                            <option value="Compliant">Yes</option>
                                            <option value="Non-Compliant">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-xl-2 col-sm-2">
                                    <div className="form-group">
                                        <label className="text-muted">Please detail what you consumed</label>
                                        <input className="form-control" type="text"  {...register("alcohol_datail", { required: true, value: nutrition.alcohol_detail })} />
                                    </div>
                                </div>
                                <div className="col-lg-2 col-xl-2 col-sm-2">
                                    <div className="form-group">
                                        <label className="text-muted">Total Alcoholic Cal consumption today</label>
                                        <input className="form-control" type="text"  {...register("alcohol_cal", { required: true, value: nutrition.alcohol_cal })} />
                                    </div>
                                </div>
                                <div className="col-md-3 pb-4">
                                    <div className="form-group">
                                        <label className="text-muted">Daily Comments</label>
                                        <input className="form-control" type="text"{...register("comment", { required: true, value: nutrition.comment })} />
                                    </div>
                                </div>

                            </div>
                            {array.map((num, index) => {
                                const meal = (nutrition.meals || [])[index] || {}
                                total.protein = (total.protein || 0) + meal.protein
                                return (
                                    <div className="row" key={index}>
                                        <div className="col-lg-2 col-xl-1 col-sm-2">
                                            <div className="form-group ">
                                                <label className="text-muted">Meal Time</label>
                                                <input className="form-control"
                                                    type="text" {...register(num + "_time", { required: true, value: meal.time })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-xl-2 col-sm-2">
                                            <div className="form-group">
                                                <label className="text-muted">Meal</label>
                                                <input className="form-control" type="text"  {...register(num + "_steak", { required: true, value: meal.steak })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-xl-1 col-sm-2">
                                            <div className="form-group">
                                                <label className="text-muted">Calories</label>
                                                <input className="form-control" type="number" {...register(num + "_calories", { required: true, value: meal.calories })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-xl-1 col-sm-2">
                                            <div className="form-group">
                                                <label className="text-muted">Protein</label>
                                                <input className="form-control" type="number"  {...register(num + "_protein", { required: true, value: meal.protein })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-xl-2 col-sm-2">
                                            <div className="form-group">
                                                <label className="text-muted">Carbohydrates</label>
                                                <input className="form-control" type="number"  {...register(num + "_carbohydrates", { required: true, value: meal.carbohydrates })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-xl-1 col-sm-2">
                                            <div className="form-group">
                                                <label className="text-muted">Fats</label>
                                                <input className="form-control" type="number"  {...register(num + "_fats", { required: true, value: meal.fats })} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-xl-3 col-sm-2">
                                            <div className="form-group">
                                                <label className="text-muted">Comment</label>
                                                <input className="form-control" type="text"  {...register(num + "_comment", { required: true, value: meal.comment })} />
                                            </div>
                                        </div>

                                        <div className="col-lg-3 col-xl-1 col-sm-4 pb-4">
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
                                <h5 className="mt-4">Daily Totals</h5>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        <label className="text-muted">Calories</label>
                                        <input className="form-control " disabled
                                            type="text" />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        <label className="text-muted">Protein</label>
                                        <input className="form-control" disabled type="text"
                                            value={total.protein} />
                                    </div>
                                </div><div className="col-md-2">
                                    <div className="form-group">
                                        <label className="text-muted">Carbohydrates</label>
                                        <input className="form-control" disabled type="text"{...register("total_carbohydrates", { required: false })} />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        <label className="text-muted">Fats</label>
                                        <input className="form-control" disabled type="text"{...register("fats", { required: false })} />
                                    </div>
                                </div>
                                <div className="col-md-4 pb-4">
                                    <div className="form-group">
                                        <label className="text-muted">Daily Comments</label>
                                        <input className="form-control" type="text"{...register("daily_comments", { required: false })} />
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
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-6">
                                    <Button
                                        onClick={() => {
                                            array.push(Math.floor(Math.random() * 100))
                                            setArray(array.filter(() => true))
                                        }}
                                        className="btn"
                                        disabled={sending}
                                        variant="contained"
                                        type="button"
                                    >Add</Button>
                                </div>
                                <div className="col-6" style={{ textAlign: 'right' }}>
                                    <Button
                                        disabled={sending}
                                        className="btn"
                                        variant="contained"
                                        type="submit"
                                    >Save</Button>
                                </div>

                            </div>
                        </div>

                    </form >
                </Container>
            </Card>
        </Container >
    );
}