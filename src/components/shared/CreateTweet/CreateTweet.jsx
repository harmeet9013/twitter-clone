import { Image } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Fragment, useState } from "react";

export default function CreateTweet(props) {
    const [tweetLength, setTweetLength] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        const tweet = e.target.tweet.value;

        console.log(typeof tweet);
    };

    const handleTextChange = (e) => {
        const tweetContent = e.target.value;
        setTweetLength((tweetContent.length / 240) * 100);
    };

    return (
        <Stack
            direction="row"
            spacing={2}
            component={Container}
            width="-webkit-fill-available"
            paddingBottom={2}
        >
            <Avatar src={props.avatar} />
            <Stack
                direction="column"
                spacing={2}
                component="form"
                onSubmit={handleSubmit}
                width="inherit"
                justifyContent="center"
                alignItems="center"
            >
                <TextField
                    required
                    fullWidth
                    placeholder="What's on your mind?"
                    id="tweet"
                    multiline
                    color="primary"
                    variant="standard"
                    onChange={handleTextChange}
                    inputProps={{ maxLength: 240 }}
                />
                <Stack
                    direction="row"
                    spacing={2}
                    component={Container}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Fragment>
                        <IconButton>
                            <Image color="primary" />
                        </IconButton>
                    </Fragment>
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                        alignItems="flex-end"
                    >
                        <Box sx={{ position: "relative" }}>
                            <CircularProgress
                                variant="determinate"
                                sx={{
                                    color: (theme) =>
                                        theme.palette.grey[
                                            theme.palette.mode === "light"
                                                ? 200
                                                : 800
                                        ],
                                }}
                                size={20}
                                thickness={4}
                                value={100}
                            />
                            <CircularProgress
                                size={20}
                                thickness={4}
                                variant="determinate"
                                value={tweetLength}
                                sx={{
                                    animationDuration: "100ms",
                                    position: "absolute",
                                    left: 0,
                                }}
                            />
                        </Box>
                        <Button
                            type="submit"
                            sx={{
                                borderRadius: "15px",
                                textTransform: "none",
                                backgroundColor: (theme) =>
                                    theme.palette.primary.main,
                                color: (theme) => theme.palette.text.primary,
                                "&:hover": {
                                    backgroundColor: (theme) =>
                                        theme.palette.primary.main,
                                },
                            }}
                        >
                            Post
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}
