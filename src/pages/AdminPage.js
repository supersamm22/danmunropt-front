import "./page.css"
import React, { useState, useEffect } from 'react'
import { isLoggedIn } from "../helpers/loginHelp";
import ReportTable from "../components/reportTable"
import { Button, ButtonGroup } from "@material-ui/core";
import Scrollbar from "../components/Scrollbar";
import MessocycleForm from "../components/messocycle/MessocycleForm";
import MessocycleTable from "../components/messocycle/MessocycleTable";
import Report from "../components/report";
import NutritionForm from "../components/Nutrition/NutritionForm";
import NutritionTable from "../components/Nutrition/NutritionTable";
import HabitForm from "../components/habit/HabitForm";
import HabitTable from "../components/habit/HabitTable";

import { motion } from 'framer-motion';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Typography, Container } from '@material-ui/core';
// components
import { MotionContainer, varBounceIn } from '../components/animate';
import Page from '../components/Page';

export default function UserPage(props) {

    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [currentUser, setCurrentUser] = useState({});
    const [showReport, setShowReport] = useState(false);
    const [bioFeedback, setBioFeedback] = useState(true);
    const [nutrition, setNutrition] = useState(false);
    const [messocycle, setMessocycle] = useState(false);
    const [habit, setHabit] = useState(false);


    const userSelect = (user) => {
        setShowReport(true)
        setCurrentUser(user)
    }
    const { pathname } = useLocation();
    useEffect(() => {
        if (pathname) {
            const split = pathname.split("/")
            if (split.length > 2) {
                setId(split[2])
            }
        }
    }, [pathname])

    const url = "";
    console.log(id)

    if (!id) {
        return (
            <Container>
                <MotionContainer initial="initial" open>
                    <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                        <motion.div variants={varBounceIn}>
                            <Typography variant="h3" paragraph>
                                Select a user to view reports
                            </Typography>
                        </motion.div>
                        <Typography sx={{ color: 'text.secondary' }}>
                            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL?
                            Be sure to check your spelling.
                        </Typography>

                        <motion.div variants={varBounceIn}>
                            <Box
                                component="img"
                                src="/static/illustrations/illustration_register.png"
                                sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
                            />
                        </motion.div>
                    </Box>
                </MotionContainer>
            </Container>
        )
    }
    return (
        <div>
            <div>
                <div className="col-sm-12 no-float mt-5">
                    <div className="container col-lg-12 col-md-12">
                        <Scrollbar>
                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                                <Button variant={bioFeedback ? "contained" : ""}
                                    onClick={() => {
                                        setBioFeedback(true)
                                        setNutrition(false)
                                        setMessocycle(false)
                                        setHabit(false)
                                    }}>
                                    Bio Feedback</Button>
                                <Button variant={nutrition ? "contained" : ""} onClick={() => {
                                    setBioFeedback(false)
                                    setNutrition(true)
                                    setMessocycle(false)
                                    setHabit(false)
                                }}>
                                    Nutritian</Button>
                                <Button variant={messocycle ? "contained" : ""} onClick={() => {
                                    setBioFeedback(false)
                                    setNutrition(false)
                                    setMessocycle(true)
                                    setHabit(false)
                                }}>
                                    Messocycle Tracker</Button>
                                <Button variant={habit ? "contained" : ""} onClick={() => {
                                    setBioFeedback(false)
                                    setNutrition(false)
                                    setMessocycle(false)
                                    setHabit(true)
                                }}>
                                    Habit Tracker</Button>
                            </ButtonGroup>
                        </Scrollbar>
                        {bioFeedback &&
                            <>
                                <ReportTable id={id} />
                                <Report id={id} />
                            </>}
                        {nutrition &&
                            <>
                                <NutritionTable id={id} />
                            </>}
                        {messocycle &&
                            <>
                                <MessocycleForm id={id} />
                                <MessocycleTable id={id} />
                            </>}
                        {habit &&
                            <>
                                <HabitTable id={id} />
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
        </div >
    )
}
