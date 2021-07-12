import { Button, Card, CircularProgress, Container, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import Icon from '@iconify/react';
import { isLoggedIn } from '../../helpers/loginHelp';
import { addHabit, getHabit } from '../../apiCalls/reportCalls';
import Loading from '../Loading';


export default function HabitForm(props) {

    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [array, setArray] = useState([]);
    const [habit, setHabit] = useState({});
    const [success, setSuccess] = useState(false);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const token_ = isLoggedIn();
        setHabit({})
        setLoading(true)
        getHabit(token_.token, token_.user.id).then(data => {
            if (data && Array.isArray(data) && data.length > 0) {
                const s = []
                data[0].habits.forEach((e, index) => {
                    s.push(index)
                })
                s.push(s.length)
                setHabit(data[0])
                setArray(s)
                setLoading(false)
            } else {
                setArray([0])
                setLoading(false)
            }
        })
    }, [props])


    const submit = (e) => {
        setSending(true)
        setError("")
        setSuccess(false)
        const habits = []
        array.forEach((num) => {
            const newH = {
                "name": e[num + "_name"], "points": e[num + "_points"], "monday": e[num + "_monday"], "tuesday": e[num + "_tuesday"],
                "wednesday": e[num + "_wednesday"], "thursday": e[num + "_thursday"], "friday": e[num + "_friday"],
                "saturday": e[num + "_saturday"], "sunday": e[num + "_sunday"]
            }
            const { name, points, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = newH
            if (name && (points || monday || tuesday || wednesday || thursday || friday || saturday || sunday)) {
                habits.push(newH)
            }
        })
        const loginData = isLoggedIn()
        const parms = {
            userId: loginData.user.id,
            habits: habits,
        }
        addHabit(loginData.token, parms).then(data => {
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
    if (loading) {
        return <Loading />
    }
    const total = {
        monday: 0, tuesday: 0, wednesday: 0, thursday: 0, friday: 0, saturday: 0, sunday: 0
    }
    array.forEach((num, index) => {
        const hb = (habit.habits || [])[index] || {}
        total.monday = total.monday + (hb.monday || 0)
        total.tuesday = total.tuesday + (hb.tuesday || 0)
        total.wednesday = total.wednesday + (hb.wednesday || 0)
        total.thursday = total.thursday + (hb.thursday || 0)
        total.friday = total.friday + (hb.friday || 0)
        total.saturday = total.saturday + (hb.saturday || 0)
        total.sunday = total.sunday + (hb.sunday || 0)
    })
    return (
        <Container className="mt-4">
            <Card className="card-padding">
                <h4 className="mt-2">Habit</h4>
                <form onSubmit={handleSubmit(submit)}>
                    <div>
                        {array.map((num, index) => {
                            const hb = (habit.habits || [])[index] || {}
                            return (
                                <div className="row row-height" key={index}>
                                    <div className="col-lg-3 md-4">
                                        <div className="form-group ">
                                            <label className="text-muted">Habit</label>
                                            <input className="form-control"
                                                type="text"{...register(num + "_name", { required: false, value: hb.name || "" })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group ">
                                            <label className="text-muted">Points</label>
                                            <input className="form-control"
                                                type="text"{...register(num + "_points", { required: false, value: hb.points })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group ">
                                            <label className="text-muted">Monday</label>
                                            <input className="form-control" type="number" {...register(num + "_monday", { required: false, value: hb.monday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Tuesday</label>
                                            <input className="form-control" type="number"  {...register(num + "_tuesday", { required: false, value: hb.tuesday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Wednesday</label>
                                            <input className="form-control" type="number" {...register(num + "_wednesday", { required: false, value: hb.wednesday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Thursday</label>
                                            <input className="form-control" type="number"  {...register(num + "_thursday", { required: false, value: hb.thursday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Friday</label>
                                            <input className="form-control" type="number"  {...register(num + "_friday", { required: false, value: hb.friday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Saturday</label>
                                            <input className="form-control" type="number"  {...register(num + "_saturday", { required: false, value: hb.saturday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Sunday</label>
                                            <input className="form-control" type="number"  {...register(num + "_sunday", { required: false, value: hb.sunday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-xl-1 col-sm-4">
                                        <IconButton sx={{ mt: 2, color: 'text.primary' }}
                                            onClick={() => {
                                                const filterArray = array.filter((e) => e !== num)
                                                setArray(filterArray)
                                            }}
                                            aria-label="delete"
                                            className="btn btn-dlt"
                                        >
                                            <Icon icon={trash2Fill} />
                                        </IconButton>
                                    </div>
                                </div>)
                        })}
                        <div className="row">
                            <div className="col-lg-2 col-xl-3 col-sm-2">
                                <Button
                                    onClick={() => {
                                        array.push(Math.floor(Math.random() * 100))
                                        setArray(array.filter(() => true))
                                    }}
                                    disabled={sending}
                                    variant="contained"
                                    type="button"
                                    className="btn mt-2"
                                >Add Habit</Button>
                            </div>
                            <div className="col-lg-2 col-xl-1 col-sm-2">
                                {/* <div className="form-group ">
                                        <label className="text-muted">Points</label>
                                        <input className="form-control" type="number"
                                            value={total.points} disabled
                                            {...register("t_points", { required: false })} />
                                    </div> */}
                            </div>
                            <div className="col-lg-2 col-xl-1 col-sm-2">
                                <div className="form-group ">
                                    <label className="text-muted">Monday</label>
                                    <input className="form-control" type="number"
                                        value={total.monday} disabled />
                                </div>
                            </div>
                            <div className="col-lg-2 col-xl-1 col-sm-2">
                                <div className="form-group ">
                                    <label className="text-muted">Tuesday</label>
                                    <input className="form-control" type="number"
                                        value={total.tuesday} disabled />
                                </div>
                            </div>
                            <div className="col-lg-2 col-xl-1 col-sm-2">
                                <div className="form-group ">
                                    <label className="text-muted">Wednesday</label>
                                    <input className="form-control" type="number"
                                        value={total.wednesday} disabled />
                                </div>
                            </div>
                            <div className="col-lg-2 col-xl-1 col-sm-2">
                                <div className="form-group ">
                                    <label className="text-muted">Thursday</label>
                                    <input className="form-control" type="number"
                                        value={total.thursday} disabled />
                                </div>
                            </div>
                            <div className="col-lg-2 col-xl-1 col-sm-2">
                                <div className="form-group ">
                                    <label className="text-muted">Friday</label>
                                    <input className="form-control" type="number"
                                        value={total.friday} disabled />
                                </div>
                            </div>
                            <div className="col-lg-2 col-xl-1 col-sm-2">
                                <div className="form-group ">
                                    <label className="text-muted">Saturday</label>
                                    <input className="form-control" type="number"
                                        value={total.saturday} disabled />
                                </div>
                            </div>
                            <div className="col-lg-2 col-xl-1 col-sm-2">
                                <div className="form-group ">
                                    <label className="text-muted">Sunday</label>
                                    <input className="form-control" type="number"
                                        value={total.sunday} disabled />
                                </div>
                            </div>
                        </div>
                        {/* end of main row */}
                        {error &&
                            <div className="alert alert-danger text-center m-3" role="alert" style={{ color: "#dc004e" }}>
                                {error}
                            </div>
                        }
                        {success &&
                            <div className="alert alert-success text-center m-3" role="alert" style={{ color: "#102770" }}>
                                Updated Successfully
                            </div>
                        }
                    </div>
                    <div className="col-md-12 m-3" style={{ textAlign: 'end' }}>
                        <Button
                            className="btn mt-2"
                            variant="link"
                            type="submit"
                            disabled={sending}
                        >Save</Button>
                    </div>

                </form >
            </Card>
        </Container>
    );
}