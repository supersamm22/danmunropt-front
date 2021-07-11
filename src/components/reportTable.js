import React, { useState } from 'react'
import { isLoggedIn } from '../helpers/loginHelp'
import { submitComment } from "../apiCalls/reportCalls"
import { Card, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import Scrollbar from './Scrollbar';

export default function ReportTable({ report, userId }) {
    const [text, setText] = useState("");
    const [error, setError] = useState("");


    const addComment = e => {
        setError("")
        e.preventDefault();
        const reportId = report._id;
        const token = isLoggedIn().token;
        const data = { text };
        submitComment(token, data, reportId, userId).then(data => {
            if (data) {
                if (data.text) {
                    report.comments.push(data)
                    setText("")
                } else {
                    setError("Unable to add comment")
                }
            } else {
                setError("Connection failed")
            }
        })

    }
    return (
        <Container className="mt-4">
            <Card className="mt-4">
                <Scrollbar>
                    <div>
                        {report &&
                            <>
                                <Typography variant="h6" id="tableTitle" component="div" my={2}>
                                    Date:{" "}{new Date(report.report_date).toDateString()}
                                </Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow><TableCell className="totals table-heading">Measurments</TableCell></TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="totals">Morning Weight</TableCell>
                                            <TableCell className="totals">Waist Circumference</TableCell>
                                            <TableCell className="totals">Resting Heartbeat</TableCell>
                                            <TableCell className="totals">BP:Systolic</TableCell>
                                            <TableCell className="totals">BP:Dystolic</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>{report.morning_weight}</TableCell>
                                            <TableCell>{report.waist_circumference}</TableCell>
                                            <TableCell>{report.resting_heart_rate}</TableCell>
                                            <TableCell>{report.bp_systolic}</TableCell>
                                            <TableCell>{report.bp_dystolic}</TableCell>
                                        </TableRow>
                                        <TableRow><TableCell className="empty"></TableCell></TableRow>
                                    </TableBody>
                                </Table>
                                <Table>
                                    <TableHead >
                                        <TableRow><TableCell className="totals table-heading">Nutrition</TableCell></TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="totals">Supliment</TableCell>
                                            <TableCell className="totals">Digestion</TableCell>
                                            <TableCell className="totals">Hunger/Apetite</TableCell>
                                            <TableCell className="totals">Satiety</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>{report.medicaton}</TableCell>
                                            <TableCell>{report.digestion}</TableCell>
                                            <TableCell>{report.hunger}</TableCell>
                                            <TableCell>{report.satiety}</TableCell>
                                        </TableRow>
                                        <TableRow><TableCell className="empty"></TableCell></TableRow>
                                    </TableBody>
                                </Table>

                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="totals table-heading">Exercise</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="totals">Exercise Complience</TableCell>
                                            <TableCell className="totals">Session Enthusiasm</TableCell>
                                            <TableCell className="totals">Training Energy</TableCell>
                                            <TableCell className="totals">Daily Steps</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>{report.exercise_complience}</TableCell>
                                            <TableCell>{report.session_enthusiasm}</TableCell>
                                            <TableCell>{report.training_energy}</TableCell>
                                            <TableCell>{report.daily_steps}</TableCell>
                                        </TableRow>
                                        <TableRow><TableCell className="empty"></TableCell></TableRow>

                                    </TableBody>
                                </Table>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="totals table-heading">LifeStyle</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="totals">Libido Morning</TableCell>
                                            <TableCell className="totals">Libido Evening</TableCell>
                                            <TableCell className="totals">Stress Morning</TableCell>
                                            <TableCell className="totals">Stress Midday</TableCell>
                                            <TableCell className="totals">Stress Evening</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>{report.libido_morning}</TableCell>
                                            <TableCell>{report.libido_evening}</TableCell>
                                            <TableCell>{report.stress_morning}</TableCell>
                                            <TableCell>{report.stress_midday}</TableCell>
                                            <TableCell>{report.stress_evening}</TableCell>
                                        </TableRow>
                                        <TableRow><TableCell className="empty"></TableCell></TableRow>
                                        <TableRow>
                                            <TableCell className="totals">Sleep Duration</TableCell>
                                            <TableCell className="totals">Sleep Quality</TableCell>
                                            <TableCell className="totals">Energy Morning</TableCell>
                                            <TableCell className="totals">Energy Midday</TableCell>
                                            <TableCell className="totals">Energy Evening</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>{report.sleep_duration}</TableCell>
                                            <TableCell>{report.sleep_quality}</TableCell>
                                            <TableCell>{report.energy_morning}</TableCell>
                                            <TableCell>{report.energy_midday}</TableCell>
                                            <TableCell>{report.energy_evening}</TableCell>
                                        </TableRow>
                                        <TableRow><TableCell className="empty"></TableCell></TableRow>
                                    </TableBody>
                                </Table>
                                <div className="row">
                                    <div className="col-md-12">
                                        <Typography className="totals table-heading" variant="h6" id="tableTitle" component="div">
                                            Admin Comments
                                        </Typography>
                                    </div>
                                    {isLoggedIn().user.isAdmin &&
                                        <div className="col-md-6">
                                            <form onSubmit={addComment}>
                                                <div className="form-group">
                                                    <div className="input-group mb-3">
                                                        <textarea type="text"
                                                            rows={4}
                                                            value={text}
                                                            onChange={e => { setText(e.target.value); setError("") }}
                                                            className="form-control"
                                                            placeholder="Your Expert Opinion" />
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: 'left' }}>
                                                    <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Add Comment</button>
                                                </div>
                                            </form>
                                        </div>
                                    }
                                    {error &&
                                        <div className="alert alert-danger self-align-center" role="alert">
                                            {error}
                                        </div>
                                    }
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div>
                                                <div className="media-body">
                                                    {(report.comments && Array.isArray(report.comments) && report.comments.length > 0) ? report.comments.map((comment, index) => (
                                                        <div key={index} className="card mt-1">
                                                            <div className="mar-btm">
                                                                <Typography className="totals table-heading" variant="h6" id="tableTitle" component="div" style={{ borderBottom: "2px solid #f1f3f4", backgroundColor: "#f1f3f4" }}>
                                                                    {comment.postedBy}
                                                                </Typography>
                                                            </div>
                                                            <Typography variant="subtitle2" id="tableTitle" component="h3" px={1} style={{ fontWeight: 200 }}>
                                                                {comment.text}
                                                            </Typography>
                                                        </div>
                                                    )) :
                                                        "No Comments"
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </Scrollbar>
            </Card>
        </Container >
    )
}
