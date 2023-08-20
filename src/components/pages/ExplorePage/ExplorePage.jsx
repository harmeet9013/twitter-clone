import { Typography } from "@mui/material";
import { Fragment } from "react";
import Header from "../../shared/Header/Header";

export default function ExplorePage(props) {
    return (
        <Fragment>
            <Header pageName="Explore" />
            <Typography variant="h4">Explore</Typography>
        </Fragment>
    );
}
