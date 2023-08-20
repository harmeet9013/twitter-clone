import {
    CommentOutlined,
    Delete,
    Edit,
    FavoriteBorderOutlined,
    MoreHoriz,
    Share,
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Container,
    Fade,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import { Fragment } from "react";
import { TransitionGroup } from "react-transition-group";

export default function Tweet(props) {
    return (
        <TransitionGroup component={null}>
            <Fade>
                <Stack
                    direction="row"
                    spacing={2}
                    component={Container}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    paddingTop={4}
                    paddingBottom={2}
                >
                    <Avatar src={props.avatar} />
                    <Stack
                        direction="column"
                        spacing={2}
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Fragment>
                                <Typography variant="body1">
                                    {props.name}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        opacity: "0.6",
                                    }}
                                >
                                    @{props.username} &#183; {props.date}
                                </Typography>
                            </Fragment>
                            {/* <Fragment>
                            <IconButton>
                                <Edit />
                            </IconButton>
                            <IconButton>
                                <Delete />
                            </IconButton>
                        </Fragment> */}
                        </Stack>
                        <Typography
                            variant="body1"
                            textAlign="left"
                            paddingBottom={2}
                        >
                            {props.content}
                        </Typography>

                        <Container>
                            <Box
                                component="img"
                                src={props.media}
                                sx={{
                                    objectFit: "cover",
                                    height: "12rem",
                                    borderRadius: "15px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    border: (theme) =>
                                        `1px solid ${theme.palette.divider}`,
                                }}
                            />

                            <Stack
                                direction="row"
                                spacing={2}
                                justifyContent="space-around"
                                alignItems="center"
                                paddingTop={1}
                            >
                                <IconButton disableRipple>
                                    <FavoriteBorderOutlined />
                                </IconButton>
                                <IconButton disableRipple>
                                    <CommentOutlined />
                                </IconButton>
                                <IconButton disableRipple>
                                    <Share />
                                </IconButton>
                            </Stack>
                        </Container>
                    </Stack>
                    <IconButton disableRipple>
                        <MoreHoriz />
                    </IconButton>
                </Stack>
            </Fade>
        </TransitionGroup>
    );
}
