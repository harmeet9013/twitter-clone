import {
    Avatar,
    Box,
    CircularProgress,
    Container,
    Divider,
    Slide,
    Stack,
    Typography,
} from "@mui/material";
import { Fragment } from "react";
import { TransitionGroup } from "react-transition-group";
import Header from "../../shared/Header/Header";

export default function ProfilePage(props) {
    return (
        <Fragment>
            <Header pageName="Profile" />
            {props.showLoading ? (
                <CircularProgress
                    color="secondary"
                    sx={{
                        mt: "25vh",
                    }}
                />
            ) : (
                <TransitionGroup component={null}>
                    <Slide direction="up">
                        <Stack direction="column" spacing={0} paddingTop={10}>
                            <Box
                                component="img"
                                src="https://cdn.hashnode.com/res/hashnode/image/upload/v1672929854812/b97fef7e-400f-4f2a-ae90-34b19078ed46.png"
                                width="100%"
                                height="300px"
                                border={(theme) =>
                                    `10px solid ${theme.palette.background.default}`
                                }
                            />

                            <Divider flexItem />

                            <Stack
                                direction="row"
                                spacing={2}
                                component={Container}
                                justifyContent="flex-start"
                                alignItems="center"
                                paddingTop={2}
                            >
                                <Avatar
                                    variant="circular"
                                    src={props.loggedUser.avatar}
                                    sx={{
                                        height: "100px",
                                        width: "100px",
                                    }}
                                />

                                <Stack
                                    direction="column"
                                    spacing={0}
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                >
                                    <Typography variant="h6">
                                        {props.loggedUser.name}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            opacity: "0.7",
                                        }}
                                    >
                                        @{props.loggedUser.username}
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack
                                direction="column"
                                spacing={0}
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                paddingTop={2}
                                component={Container}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        opacity: "0.6",
                                    }}
                                >
                                    Bio
                                </Typography>
                                <Typography variant="body1">
                                    This is my bio!!!!
                                </Typography>
                            </Stack>
                        </Stack>
                    </Slide>
                </TransitionGroup>
            )}
        </Fragment>
    );
}
