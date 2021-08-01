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
    const [start, setStart] = useState(week());
    const [periodizations, setPeriodizations] = useState([]);
    const [success, setSuccess] = useState(false);
    const [sending, setSending] = useState(false);
    const currentWeek = week()

    useEffect(() => {
        const token_ = isLoggedIn();
        setPeriodizations([])
        setLoading(true)
        console.log(",,,", token_)
        getPeriodization(token_.token, token_.user.id).then(data => {
            if (data && Array.isArray(data) && data.length > 0) {
                let s
                data.forEach((p) => {
                    if (!s || (p.year * 100 + p.week) < s.year * 100 + s.week) {
                        s = p
                    }
                })
                setStart(s.week)
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
        const { notes, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = e
        const loginData = isLoggedIn()
        const parms = {
            userId: loginData.user.id,
            week: week(),
            year: year(),
            notes, monday, tuesday, wednesday, thursday, friday, saturday, sunday
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
    const weeks = []
    while (weeks.length < currentWeek - start) {
        weeks.push(start + weeks.length)
    }
    return (
        <Container className="mt-4">
            <Card className="card-padding">
                <h4 className="mt-2">Periodization</h4>
                <form onSubmit={() => { }}>
                    <div>
                        {weeks.map((w, index) => {
                            const hb = periodizations.find((e) => e.week == w) || { week: w, year: year() }
                            console.log(hb)
                            const start_ = startOfWeek(hb.week, hb.year)
                            return (
                                <div className="row" key={index}>
                                    <div className="col-lg-2 col-xl-1 col-sm-2 d-flex justify-content-center align-items-center">
                                        <div className="form-group ">
                                            Week: {index + 1}
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group ">
                                            <label className="text-muted">Monday<br />{fDate(addDays(start_, 0))}</label>
                                            <input className="form-control" type="number" disabled
                                                {...register(index + "_monday", { required: false, value: hb.monday, })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Tuesday<br />{fDate(addDays(start_, 1))}</label>
                                            <input className="form-control" type="number" disabled
                                                {...register(index + "_tuesday", { required: false, value: hb.tuesday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Wednesday<br />{fDate(addDays(start_, 2))}</label>
                                            <input className="form-control" type="number" disabled
                                                {...register(index + "_wednesday", { required: false, value: hb.wednesday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Thursday<br />{fDate(addDays(start_, 3))}</label>
                                            <input className="form-control" type="number" disabled
                                                {...register(index + "_thursday", { required: false, value: hb.thursday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Friday<br />{fDate(addDays(start_, 4))}</label>
                                            <input className="form-control" type="number" disabled
                                                {...register(index + "_friday", { required: false, value: hb.friday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Saturday<br />{fDate(addDays(start_, 5))}</label>
                                            <input className="form-control" type="number" disabled
                                                {...register(index + "_saturday", { required: false, value: hb.saturday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Sunday<br />{fDate(addDays(start_, 6))}</label>
                                            <input className="form-control" type="number" disabled
                                                {...register(index + "_sunday", { required: false, value: hb.sunday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-3 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted"><br />Notes<br /></label>
                                            <input className="form-control" type="number" disabled
                                                {...register(index + "_sunday", { required: false, value: hb.sunday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                        </div>
                                    </div>
                                </div>)
                        })}
                    </div>
                </form >
                <form onSubmit={handleSubmit(submit)}>
                    <div>
                        {[week()].map((w, index) => {
                            const hb = periodizations.find((e) => e.week == w) || { week: w, year: year() }
                            const start_ = startOfWeek(hb.week, hb.year)
                            return (
                                <div className="row" key={index}>
                                    <div className="col-lg-2 col-xl-1 col-sm-2 d-flex justify-content-center align-items-center">
                                        <div className="form-group ">
                                            Week: {weeks.length + 1}
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group ">
                                            <label className="text-muted">Monday<br />{fDate(addDays(start_, 0))}</label>
                                            <input className="form-control" type="number" {...register("monday", { required: false, value: hb.monday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Tuesday<br />{fDate(addDays(start_, 1))}</label>
                                            <input className="form-control" type="number"  {...register("tuesday", { required: false, value: hb.tuesday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Wednesday<br />{fDate(addDays(start_, 2))}</label>
                                            <input className="form-control" type="number" {...register("wednesday", { required: false, value: hb.wednesday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Thursday<br />{fDate(addDays(start_, 3))}</label>
                                            <input className="form-control" type="number"  {...register("thursday", { required: false, value: hb.thursday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Friday<br />{fDate(addDays(start_, 4))}</label>
                                            <input className="form-control" type="number"  {...register("friday", { required: false, value: hb.friday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Saturday<br />{fDate(addDays(start_, 5))}</label>
                                            <input className="form-control" type="number"  {...register("saturday", { required: false, value: hb.saturday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Sunday<br />{fDate(addDays(start_, 6))}</label>
                                            <input className="form-control" type="number"  {...register("sunday", { required: false, value: hb.sunday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-3 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted"><br />Notes<br /></label>
                                            <input className="form-control" type="text"  {...register("notes", { required: false, value: hb.notes })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <Button
                                            className="btn mt-4"
                                            variant="link"
                                            size="xs"
                                            type="submit"
                                            disabled={sending}
                                        >Save</Button>

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
                </form >
            </Card>
        </Container>
    );
}