import React from "react"
import MessocycleTable from "src/components/messocycle/MessocycleTable"
import { isLoggedIn } from "src/helpers/loginHelp"
import Page from "../components/Page"

export default function MessocycleTracker() {
    return (
        <Page title="MesocycleTracker">
            <MessocycleTable id={isLoggedIn().user.id} isUser={true} />
        </Page>
    )
}