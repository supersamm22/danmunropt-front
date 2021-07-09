import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
//-------
import { uploadReport } from "../apiCalls/reportCalls"
import { isLoggedIn } from "../helpers/loginHelp"

const FeedbackForm = () => {

    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");



    const onSubmit = (data) => {
        setError("")
        const token = isLoggedIn().token;
        setLoading(true)
        const report = { data };
        uploadReport(report, token).then(data => {
            if (data) {
                if (data.msg) {
                    setLoading(false)
                    setError(data.msg)
                } else {
                    reset()
                    setLoading(false)
                }
            } else {
                setError("Unable to connect to database")
                setLoading(false)
            }
        })
    }


    useEffect(() => {
    }, [])

    return (
        <div className="container">
            <h2 className="mt-2">Bio Feedback Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-6">
                        <h4 className="mt-2">Measurement</h4>
                        <div className="form-group ">
                            <label className="text-muted">Morning Weight</label>
                            <input className="form-control" type="number" {...register("morning_weight", { required: true })} />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Waist Circumference</label>
                            <input className="form-control" type="number"  {...register("waist_circumference", { required: true })} />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Resting Heart Rate (RHR)</label>
                            <input className="form-control" type="number" {...register("resting_heart_rate", { required: true })} />
                        </div>
                        <div className="row">
                            <div className="col-md-6">

                                <div className="form-group">
                                    <label className="text-muted">BP: Systolic</label>
                                    <input className="form-control" type="number"  {...register("bp_systolic", { required: true })} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="text-muted">BP: Dystolic</label>
                                    <input className="form-control" type="number"  {...register("bp_dystolic", { required: true })} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <h4 className="mt-2">Nutrition</h4>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="text-muted">Medication</label>
                                    <select class="form-control" {...register("medicaton", { required: true })}>
                                        <option value="">Select...</option>
                                        <option value="Compliant">Compliant</option>
                                        <option value="Non-Compliant">Non-Compliant</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="text-muted">Digestion</label>
                                    <select class="form-control" {...register("digestion", { required: true })}>
                                        <option value="">Select...</option>
                                        <option value="Good">Good</option>
                                        <option value="Poor">Poor</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="text-muted">Hunger/Apetite</label>
                                    <select class="form-control" {...register("hunger", { required: true })}>
                                        <option value="">Select...</option>
                                        <option value="Good">Good</option>
                                        <option value="Poor">Poor</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="text-muted">Satiety</label>
                                    <select class="form-control" {...register("satiety", { required: true })}>
                                        <option value="">Select...</option>
                                        <option value="Good">Good</option>
                                        <option value="Poor">Poor</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <h4 className="mt-2">Exercise</h4>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="text-muted">Exercise Complience</label>
                                    <select class="form-control" {...register("exercise_complience", { required: true })}>
                                        <option value="">Select...</option>
                                        <option value="Good">Good</option>
                                        <option value="Poor">Poor</option>

                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="text-muted">Session Enthusiasm</label>
                                    <select class="form-control" {...register("session_enthusiasm", { required: true })}>
                                        <option value="">Select...</option>
                                        <option value="Good">Good</option>
                                        <option value="Poor">Poor</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="text-muted">Training Energy</label>
                                    <select class="form-control" {...register("training_energy", { required: true })}>
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
                    <div className="col-md-6">
                        <h4 className="mt-2">Lifestyle</h4>
                        <div className="row">
                            <h5 className="mt-4">Sleep</h5>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="text-muted">Duration</label>
                                    <input className="form-control" type="text" {...register("sleep_duration", { required: true })} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="text-muted">Quality</label>
                                    <select class="form-control" {...register("sleep_quality", { required: true })}>
                                        <option value="">Select...</option>
                                        <option value="Good">Good</option>
                                        <option value="Average">Average</option>
                                        <option value="Poor">Poor</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <h5 className="mt-4">Energy</h5>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <div className="form-group">
                                        <label className="text-muted">Morning</label>
                                        <select class="form-control" {...register("energy_morning", { required: true })}>
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
                                        <select class="form-control" {...register("energy_midday", { required: true })}>
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
                                        <select class="form-control" {...register("energy_evening", { required: true })}>
                                            <option value="">Select...</option>
                                            <option value="Good">Good</option>
                                            <option value="Average">Average</option>
                                            <option value="Poor">Poor</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h5 className="mt-4">Libido</h5>
                        <div className="row">
                            <div className="col-md-6">

                                <div className="form-group">
                                    <div className="form-group">
                                        <label className="text-muted">Morning</label>
                                        <select class="form-control" {...register("libido_morning", { required: true })}>
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
                                        <select class="form-control" {...register("libido_evening", { required: true })}>
                                            <option value="">Select...</option>
                                            <option value="High">High</option>
                                            <option value="Low">Low</option>
                                            <option value="Moderate">Moderate</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h5 className="mt-4">Stress</h5>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <div className="form-group">
                                        <label className="text-muted">Morning</label>
                                        <select class="form-control" {...register("stress_morning", { required: true })}>
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
                                        <select class="form-control" {...register("stress_midday", { required: true })}>
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
                                        <select class="form-control" {...register("stress_evening", { required: true })}>
                                            <option value="">Select...</option>
                                            <option value="High">High</option>
                                            <option value="Low">Low</option>
                                            <option value="Moderate">Moderate</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 m-2 text-center">
                            <button className="btn btn-raised btn-primary m-2" type="submit" >Add Bio Feedback</button>
                        </div>
                    </div>
                    {/* end of main row */}
                    {loading &&
                        <div className="alert alert-primary self-align-center m-3 " role="alert">
                            Uploading Report....
                        </div>
                    }
                    {error &&
                        <div className="alert alert-danger self-align-center m-3" role="alert">
                            {error}
                        </div>
                    }
                </div>
            </form>
        </div>
    );
};

export default FeedbackForm;