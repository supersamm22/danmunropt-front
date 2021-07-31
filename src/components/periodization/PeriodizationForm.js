import { Button, Card, CircularProgress, Container, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import Icon from '@iconify/react';
import { isLoggedIn } from '../../helpers/loginHelp';
import { addPeriodization, getPeriodization } from '../../apiCalls/reportCalls';
import Loading from '../Loading';
import { week, year } from 'src/utils/formatTime';
import PeriodizationTable from 'src/components/periodization/PeriodizationTable';


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
        console.log(",,,", token_)
        getPeriodization(token_.token, token_.user.id).then(data => {
            if (data && Array.isArray(data) && data.length > 0) {
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
        const periodization = {}
        const { notes, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = e
        const loginData = isLoggedIn()
        const parms = {
            userId: loginData.user.id,
            week: week(),
            year: year()
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
    return (
        <Container className="mt-4">
            <Card className="card-padding">
                <h4 className="mt-2">Periodization</h4>
                <form onSubmit={handleSubmit(submit)}>
                    <div>
                        {periodizations.map((hb, index) => {
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
                                            <input className="form-control" type="number" {...register(index + "_monday", { required: false, value: hb.monday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Tuesday<br />01/08/2021</label>
                                            <input className="form-control" type="number"  {...register(index + "_tuesday", { required: false, value: hb.tuesday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Wednesday<br />01/08/2021</label>
                                            <input className="form-control" type="number" {...register(index + "_wednesday", { required: false, value: hb.wednesday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Thursday<br />01/08/2021</label>
                                            <input className="form-control" type="number"  {...register(index + "_thursday", { required: false, value: hb.thursday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Friday<br />01/08/2021</label>
                                            <input className="form-control" type="number"  {...register(index + "_friday", { required: false, value: hb.friday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Saturday<br />01/08/2021</label>
                                            <input className="form-control" type="number"  {...register(index + "_saturday", { required: false, value: hb.saturday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Sunday<br />01/08/2021</label>
                                            <input className="form-control" type="number"  {...register(index + "_sunday", { required: false, value: hb.sunday })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-xl-1 col-sm-2">
                                        <div className="form-group">
                                            <label className="text-muted">Notes<br /></label>
                                            <input className="form-control" type="number"  {...register(index + "_sunday", { required: false, value: hb.sunday })} />
                                        </div>
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