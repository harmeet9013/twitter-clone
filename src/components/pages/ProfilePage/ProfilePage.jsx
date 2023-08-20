import { Typography } from "@mui/material";
import { Fragment } from "react";
import Header from "../../shared/Header/Header";

export default function ProfilePage(props) {
    return (
        <Fragment>
            <Header pageName="Profile" />
            <Typography variant="h4">Profile</Typography>
        </Fragment>
    );
}
