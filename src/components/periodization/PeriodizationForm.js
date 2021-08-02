import { Button, Card, CircularProgress, Container, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { isLoggedIn } from '../../helpers/loginHelp';
import { addPeriodization, getPeriodization } from '../../apiCalls/reportCalls';
import Loading from '../Loading';
import { fDate, startOfWeek, week, year, addDays } from 'src/utils/formatTime';


export default function PeriodizationForm(props) {

    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [periodizations, setPeriodizations] = useState([]);
    const [success, setSuccess] = useState(false);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const token_ = isLoggedIn();
        setPeriodizations([])
        setLoading(true)
        getPeriodization(token_.token, token_.user.id).then(data => {
            if (data && Array.isArray(data) && data.length > 0) {
                if (data.filter(e => e.week === week() && e.year == year()).length == 0) {
                    const loginData = isLoggedIn()
                    data.push({
                        userId: loginData.user.id,
                        week: week(),
                        year: year(),
                    })
                }
                setPeriodizations(data)
                setLoading(false)
            } else {
                setLoading(false)
            }
        })
    }, [props])


    const submit = (e) => {
        setSending(true)
        setError("")
        setSuccess(false)
        const loginData = isLoggedIn()
        addPeriodization(loginData.token, e).then(data => {
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
    return (
        <Container className="mt-4">
            <Card className="card-padding">
                <h4 className="mt-2">Periodization</h4>
                <div>
                    {periodizations.map((hb, index) => {
                        const start_ = startOfWeek(hb.week, hb.year)
                        return (
                            <form onSubmit={handleSubmit((e) => {
                                const monday = e[index + "_monday"]
                                const tuesday = e[index + "_tuesday"]
                                const wednesday = e[index + "_wednesday"]
                                const thursday = e[index + "_thursday"]
                                const friday = e[index + "_friday"]
                                const saturday = e[index + "_saturday"]
                                const sunday = e[index + "_sunday"]
                                const notes = e[index + "_notes"]

                                if (monday) {
                                    hb.monday = parseInt(monday)
                                }
                                if (tuesday) {
                                    hb.tuesday = parseInt(tuesday)
                                }
                                if (wednesday) {
                                    hb.wednesday = parseInt(wednesday)
                                }
                                if (thursday) {
                                    hb.thursday = parseInt(thursday)
                                }
                                if (friday) {
                                    hb.friday = parseInt(friday)
                                }
                                if (saturday) {
                                    hb.saturday = parseInt(saturday)
                                }
                                if (sunday) {
                                    hb.sunday = parseInt(sunday)
                                }
                                hb.notes = notes
                                submit(hb)
                            })}
                                id={"form" + index} key={"key" + index}>
                                <div className="row" key={index}>
                                    <div className="col-lg-2 col-xl-1 col-sm-2 d-flex justify-content-center align-items-center">
                                        <div className="form-group ">
                                            Week: {index + 1}
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group ">
                                            <label className="text-muted">Monday<br />{fDate(addDays(start_, 0))}</label>
                                            <input className="form-control" type="number"
                                                {...register(index + "_monday", { required: false, value: hb.monday, })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Tuesday<br />{fDate(addDays(start_, 1))}</label>
                                            <input className="form-control" type="number"
                                                {...register(index + "_tuesday", { required: false, value: hb.tuesday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Wednesday<br />{fDate(addDays(start_, 2))}</label>
                                            <input className="form-control" type="number"
                                                {...register(index + "_wednesday", { required: false, value: hb.wednesday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Thursday<br />{fDate(addDays(start_, 3))}</label>
                                            <input className="form-control" type="number"
                                                {...register(index + "_thursday", { required: false, value: hb.thursday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Friday<br />{fDate(addDays(start_, 4))}</label>
                                            <input className="form-control" type="number"
                                                {...register(index + "_friday", { required: false, value: hb.friday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Saturday<br />{fDate(addDays(start_, 5))}</label>
                                            <input className="form-control" type="number"
                                                {...register(index + "_saturday", { required: false, value: hb.saturday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Sunday<br />{fDate(addDays(start_, 6))}</label>
                                            <input className="form-control" type="number"
                                                {...register(index + "_sunday", { required: false, value: hb.sunday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-3 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted"><br />Notes<br /></label>
                                            <input className="form-control" type="text"
                                                {...register(index + "_notes", { required: false, value: hb.notes })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <Button
                                                className="btn mt-4"
                                                variant="link"
                                                size="xs"
                                                type="submit"
                                                disabled={sending}
                                            >Save</Button>
                                        </div>
                                    </div>
                                </div>
                            </form >)
                    })}
                </div>
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

            </Card>
        </Container>
    );
}