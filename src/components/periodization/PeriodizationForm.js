import { Button, Card, CircularProgress, Container, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import Icon from '@iconify/react';
import { isLoggedIn } from '../../helpers/loginHelp';
import { addPeriodization, getPeriodization } from '../../apiCalls/reportCalls';
import Loading from '../Loading';


export default function PeriodizationForm(props) {

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
        getPeriodization(token_.token, token_.user.id).then(data => {
            if (data && Array.isArray(data) && data.length > 0) {
                const s = []
                // setHabit()
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
            week: 29,
            year: 2021
        }
        addPeriodization(loginData.token, parms).then(data => {
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
        monday: 0, tuesday: 0, wednesday: 0, thursday: 0, friday: 0, saturday: 0, sunday: 0, points: 0
    }
    array.forEach((num, index) => {
        const hb = (habit.habits || [])[index] || {}
        total.points = total.points + (hb.points || 0)
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
                <h4 className="mt-2">Periodization</h4>
                <form onSubmit={handleSubmit(submit)}>
                    <div>
                        {array.map((num, index) => {
                            const hb = (habit.habits || [])[index] || {}
                            return (
                                <div className="row" key={index}>
                                    <div className="col-lg-2 col-xl-1 col-sm-2 d-flex justify-content-center align-items-center">
                                        <div className="form-group ">
                                            Week: {index + 1}
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group ">
                                            <label className="text-muted">Monday<br />01/08/2021</label>
                                            <input className="form-control" type="number" {...register(num + "_monday", { required: false, value: hb.monday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Tuesday<br />01/08/2021</label>
                                            <input className="form-control" type="number"  {...register(num + "_tuesday", { required: false, value: hb.tuesday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Wednesday<br />01/08/2021</label>
                                            <input className="form-control" type="number" {...register(num + "_wednesday", { required: false, value: hb.wednesday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Thursday<br />01/08/2021</label>
                                            <input className="form-control" type="number"  {...register(num + "_thursday", { required: false, value: hb.thursday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Friday<br />01/08/2021</label>
                                            <input className="form-control" type="number"  {...register(num + "_friday", { required: false, value: hb.friday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Saturday<br />01/08/2021</label>
                                            <input className="form-control" type="number"  {...register(num + "_saturday", { required: false, value: hb.saturday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Sunday<br />01/08/2021</label>
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
                    <div className="row" >
                        <div className="col-lg-6 col-xl-6 col-sm-5">
                            <Button
                                onClick={() => {
                                    array.push(Math.floor(Math.random() * 100))
                                    setArray(array.filter(() => true))
                                }}
                                disabled={sending}
                                variant="contained"
                                type="button"
                                className="btn mt-4"
                            >Add Week</Button>
                        </div>

                        <div className="col-lg-6 col-xl-6 col-sm-6  " style={{ textAlign: 'end' }}>
                            <Button
                                className="btn mt-4"
                                variant="link"
                                type="submit"
                                disabled={sending}
                            >Save</Button>
                        </div>
                    </div>

                </form >
            </Card>
        </Container>
    );
}