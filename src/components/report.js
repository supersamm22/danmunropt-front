import { Card, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
//-------
import { lastReport } from "../apiCalls/reportCalls"
import { isLoggedIn } from "../helpers/loginHelp"
import Loading from './Loading';
import Page from './Page';
import ReportTable from "./reportTable"

const Report = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [report, setReport] = useState({});

    useEffect(() => {
        const token = isLoggedIn().token;

        lastReport(token).then(data => {
            if (data) {
                if (data.msg) {
                    setError(data.msg)
                    setLoading(false)
                } else {
                    setReport(data.report)
                    setLoading(false)
                }
            } else {
                setError("Unable to get report data")
                setLoading(false)
            }
        })
    }, [])

    return (
        <Page title="Daniel Munro | Bio Feedback">
            <Container className="mt-4 mb-4">
                <h2 className="mt-2 text-center" >Previous Report</h2>
                {loading ?
                    <Loading />
                    :
                    error ?
                        <div className="alert alert-danger self-align-center" role="alert">
                            {error}
                        </div> :
                        <div>
                            <ReportTable report={report} />
                        </div>
                }

            </Container>
        </Page>
    );
};

export default Report;