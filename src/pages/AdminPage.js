import "./page.css"
import React, { useState, useEffect } from 'react'
import { getUsers } from "../apiCalls/adminCalls"
import { isLoggedIn } from "../helpers/loginHelp";
import ReportTable from "../components/reportTable"
import { Button, ButtonGroup } from "@material-ui/core";
import Nutritian from "../components/Nutrition";
import Messocycle from "src/components/Messocycle";
import Habbit from "src/components/Habbit";
import BioFeedback from "src/components/BioFeedback";
import Scrollbar from "src/components/Scrollbar";
import HabbitForm from "src/components/habbit/HabbitForm";
import HabbitTable from "src/components/habbit/HabbitTable";
import MessocycleForm from "src/components/messocycle/MessocycleForm";
import MessocycleTable from "src/components/messocycle/MessocycleTable";
import Report from "src/components/report";
import NutritionForm from "src/components/Nutrition/NutritionForm";
import NutritionTable from "src/components/Nutrition/NutritionTable";
export default function UserPage() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentUser, setCurrentUser] = useState({});
    const [showReport, setShowReport] = useState(false);
    const [bioFeedback, setBioFeedback] = useState(false);
    const [nutrition, setNutrition] = useState(false);
    const [messocycle, setMessocycle] = useState(false);
    const [habbit, setHabbit] = useState(false);


    const userSelect = (user) => {
        setShowReport(true)
        setCurrentUser(user)
    }
    console.log("I am rendering alot")
    useEffect(() => {
        //will get all the data of users here
        const token = isLoggedIn().token;
        // getUsers(token).then(data => {
        //     if (data) {
        //         if (data.msg) {
        //             setError(data.msg)
        //             setLoading(false)
        //         } else {
        //             setUsers(data.users)
        //             setLoading(false)
        //         }
        //     } else {
        //         setError("Unable to connect to database")
        //     }
        // })
    }, [])

    const url = "";
    return (
        <div>
            {loading ?
                <div className="container">
                    <div className="row m-5">
                        <div className="alert alert-primary self-align-center" role="alert">
                            Data is Loading...
                        </div>
                    </div>
                </div>
                :
                error
                    ?
                    <div className="container">
                        <div className="row m-5">
                            <div className="alert alert-danger self-align-center" role="alert">
                                {error}
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="col-sm-12 no-float mt-5">
                            <div className="container col-lg-12 col-md-12">
                                <Scrollbar>
                                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                                        <Button variant="contained" onClick={() => setBioFeedback(true)}>Bio Feedback</Button>
                                        <Button onClick={() => setNutrition(true)}>Nutritian</Button>
                                        <Button onClick={() => setMessocycle(true)}>Messocycle Tracker</Button>
                                        <Button onClick={() => setHabbit(true)}>Habbit Tracker</Button>
                                    </ButtonGroup>
                                </Scrollbar>
                                {bioFeedback &&
                                    <>
                                        <ReportTable />
                                        <Report />
                                    </>}
                                {nutrition &&
                                    <>
                                        <NutritionForm />
                                        <NutritionTable />
                                    </>}
                                {messocycle &&
                                    <>
                                        <MessocycleForm />
                                        <MessocycleTable />
                                    </>}
                                {habbit &&
                                    <>
                                        <HabbitForm />
                                        <HabbitTable />
                                    </>}
                                {currentUser && currentUser.reports && currentUser.reports.length === 0
                                    ?
                                    <div className="alert alert-danger self-align-center" role="alert">
                                        {currentUser.name} has no report
                                    </div>
                                    :
                                    <>
                                        {showReport && <ReportTable report={currentUser.reports[currentUser.reports.length - 1]} userId={currentUser._id} />}
                                    </>
                                }

                            </div>
                        </div>
                    </div>
            }
        </div >
    )
}
