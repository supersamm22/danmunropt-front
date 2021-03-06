import { Card, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { uploadReport } from "../apiCalls/reportCalls"
import { isLoggedIn } from "../helpers/loginHelp"
import Loading from './Loading';

const FeedbackForm = () => {

    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [sending, setSending] = useState(false);



    const onSubmit = (data) => {
        setError("")
        setLoading(true)
        setSending(true)
        setSuccess(false)
        console.log("1", sending)
        const token = isLoggedIn().token;
        const report = { data };
        uploadReport(report, token).then(data => {
            if (data) {
                if (data.msg) {
                    setLoading(false)
                    setError(data.msg)
                    setSending(false)
                } else {
                    reset()
                    setLoading(false)
                    setSending(false)
                }
            } else {
                setError("Unable to connect to database")
                setLoading(false)
                setSending(false)
                setSuccess(false)
            }
        })
    }


    useEffect(() => {
    }, [])

    return (
        <Container>
            <Card className="card-padding">
                <h4>Bio Feedback</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-12">
                                    <h5 className="mb-0">Measurement</h5>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group ">
                                        <label className="text-muted">Morning Weight</label>
                                        <input className="form-control" type="number" {...register("morning_weight", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="text-muted">Waist Circumference</label>
                                        <input className="form-control" type="number"  {...register("waist_circumference", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="text-muted">Resting Heart Rate (RHR)</label>
                                        <input className="form-control" type="number" {...register("resting_heart_rate", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="text-muted">BP: Systolic</label>
                                        <input className="form-control" type="number"  {...register("bp_systolic", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="text-muted">BP: Dystolic</label>
                                        <input className="form-control" type="number"  {...register("bp_dystolic", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <h5 className="mt-2 mb-0">Nutrition</h5>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="text-muted">Medication</label>
                                        <select className="form-control" {...register("medicaton", { required: true })}>
                                            <option value="">Select...</option>
                                            <option value="Compliant">Compliant</option>
                                            <option value="Non-Compliant">Non-Compliant</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="text-muted">Digestion</label>
                                        <select className="form-control" {...register("digestion", { required: true })}>
                                            <option value="">Select...</option>
                                            <option value="Good">Good</option>
                                            <option value="Poor">Poor</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="text-muted">Hunger/Apetite</label>
                                        <select className="form-control" {...register("hunger", { required: true })}>
                                            <option value="">Select...</option>
                                            <option value="Good">Good</option>
                                            <option value="Poor">Poor</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="text-muted">Satiety</label>
                                        <select className="form-control" {...register("satiety", { required: true })}>
                                            <option value="">Select...</option>
                                            <option value="Good">Good</option>
                                            <option value="Poor">Poor</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <h5 className="mt-2">Exercise</h5>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="text-muted">Exercise Complience</label>
                                        <select className="form-control" {...register("exercise_complience", { required: true })}>
                                            <option value="">Select...</option>
                                            <option value="Good">Good</option>
                                            <option value="Poor">Poor</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="text-muted">Session Enthusiasm</label>
                                        <select className="form-control" {...register("session_enthusiasm", { required: true })}>
                                            <option value="">Select...</option>
                                            <option value="Good">Good</option>
                                            <option value="Poor">Poor</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="text-muted">Training Energy</label>
                                        <select className="form-control" {...register("training_energy", { required: true })}>
                                            <option value="">Select...</option>
                                            <option value="Good">Good</option>
                                            <option value="Poor">Poor</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="text-muted">Daily Steps</label>
                                        <input className="form-control" type="number" {...register("daily_steps", { required: true })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end of left side and start of right side */}
                        <div className="col-md-6 pl-20">
                            <div className="row">
                                <div className="col-md-12">
                                    <h5 className="mt-2 mb-0">Lifestyle</h5>
                                </div>
                                <div className="col-md-12">
                                    <h5 className="mb-0">Sleep</h5>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="text-muted">Duration</label>
                                        <input className="form-control" type="text" {...register("sleep_duration", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="text-muted">Quality</label>
                                        <select className="form-control" {...register("sleep_quality", { required: true })}>
                                            <option value="">Select...</option>
                                            <option value="Good">Good</option>
                                            <option value="Average">Average</option>
                                            <option value="Poor">Poor</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <h5 className="mt-2 mb-0">Energy</h5>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <div className="form-group">
                                            <label className="text-muted">Morning</label>
                                            <select className="form-control" {...register("energy_morning", { required: true })}>
                                                <option value="">Select...</option>
                                                <option value="Good">Good</option>
                                                <option value="Average">Average</option>
                                                <option value="Poor">Poor</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <div className="form-group">
                                            <label className="text-muted">Midday</label>
                                            <select className="form-control" {...register("energy_midday", { required: true })}>
                                                <option value="">Select...</option>
                                                <option value="Good">Good</option>
                                                <option value="Average">Average</option>
                                                <option value="Poor">Poor</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <div className="form-group">
                                            <label className="text-muted">Evening</label>
                                            <select className="form-control" {...register("energy_evening", { required: true })}>
                                                <option value="">Select...</option>
                                                <option value="Good">Good</option>
                                                <option value="Average">Average</option>
                                                <option value="Poor">Poor</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <h5 className="mt-2 mb-0">Libido</h5>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <div className="form-group">
                                            <label className="text-muted">Morning</label>
                                            <select className="form-control" {...register("libido_morning", { required: true })}>
                                                <option value="">Select...</option>
                                                <option value="High">High</option>
                                                <option value="Low">Low</option>
                                                <option value="Moderate">Moderate</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <div className="form-group">
                                            <label className="text-muted">Evening</label>
                                            <select className="form-control" {...register("libido_evening", { required: true })}>
                                                <option value="">Select...</option>
                                                <option value="High">High</option>
                                                <option value="Low">Low</option>
                                                <option value="Moderate">Moderate</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <h5 className="mt-2 mb-0">Stress</h5>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <div className="form-group">
                                            <label className="text-muted">Morning</label>
                                            <select className="form-control" {...register("stress_morning", { required: true })}>
                                                <option value="">Select...</option>
                                                <option value="High">High</option>
                                                <option value="Low">Low</option>
                                                <option value="Moderate">Moderate</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <div className="form-group">
                                            <label className="text-muted">Midday</label>
                                            <select className="form-control" {...register("stress_midday", { required: true })}>
                                                <option value="">Select...</option>
                                                <option value="High">High</option>
                                                <option value="Low">Low</option>
                                                <option value="Moderate">Moderate</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <div className="form-group">
                                            <label className="text-muted">Evening</label>
                                            <select className="form-control" {...register("stress_evening", { required: true })}>
                                                <option value="">Select...</option>
                                                <option value="High">High</option>
                                                <option value="Low">Low</option>
                                                <option value="Moderate">Moderate</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {loading &&
                                    <div className="alert alert-primary text-center m-3 " role="alert">
                                        Adding Bio Feedback....
                                    </div>
                                }
                                {error &&
                                    <div className="alert alert-danger text-center m-3" role="alert" style={{ color: "#dc004e" }}>
                                        {error}
                                    </div>
                                }
                                {success &&
                                    <div className="alert alert-success text-center m-3" role="alert" style={{ color: "#102770" }}>
                                        Add Bio Feedback Succesfully
                                    </div>
                                }
                                <div className="col-md-12  text-end">
                                    <button className="btn btn-raised btn-primary mt-4" type="submit" disabled={sending}>Add Bio Feedback</button>
                                </div>
                            </div>
                            {/* end of main row */}

                        </div>
                    </div>
                </form>
            </Card>
        </Container >
    );
};

export default FeedbackForm;