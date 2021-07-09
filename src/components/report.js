import React, { useEffect, useState } from 'react';
//-------
import { lastReport } from "../apiCalls/reportCalls"
import { isLoggedIn } from "../helpers/loginHelp"
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
        <div className="container">
            <h2 className="mt-2">Previous Report</h2>
            {loading ?
                <div className="alert alert-primary self-align-center" role="alert">
                    Uploading Report....
                </div>
                :
                error ?
                    <div className="alert alert-danger self-align-center" role="alert">
                        {error}
                    </div> :
                    <div>
                        <ReportTable report={report} />
                    </div>
            }
        </div>
    );
};

export default Report;