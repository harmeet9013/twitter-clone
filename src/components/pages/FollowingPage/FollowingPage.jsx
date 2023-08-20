import { CircularProgress, Divider, Slide, Stack } from "@mui/material";
import { Fragment } from "react";
import Header from "../../shared/Header/Header";
import Tweet from "../../shared/Tweet/Tweet";
import { TransitionGroup } from "react-transition-group";
import CreateTweet from "../../shared/CreateTweet/CreateTweet";

export default function FollowingPage(props) {
    return (
        <Fragment>
            <Header pageName="Following" />
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
                        <Stack direction="column" paddingTop={15}>
                            {props.loggedUser.logged && (
                                <Fragment>
                                    <CreateTweet
                                        avatar={props.loggedUser.avatar}
                                    />
                                    <Divider flexItem />
                                </Fragment>
                            )}
                            <Tweet
                                avatar="https://i.ibb.co/QXVvvcS/photo-2023-05-22-21-00-29.jpg"
                                name="Harmeet Singh"
                                username="harmeet9013"
                                date="18th August 2023"
                                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                media="https://cdn.hashnode.com/res/hashnode/image/upload/v1672929854812/b97fef7e-400f-4f2a-ae90-34b19078ed46.png"
                            />
                            <Divider flexItem />
                            <Tweet
                                avatar="https://i.ibb.co/QXVvvcS/photo-2023-05-22-21-00-29.jpg"
                                name="Harmeet Singh"
                                username="harmeet9013"
                                date="18th August 2023"
                                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                media="https://cdn.hashnode.com/res/hashnode/image/upload/v1672929854812/b97fef7e-400f-4f2a-ae90-34b19078ed46.png"
                            />
                            <Divider flexItem />
                            <Tweet
                                avatar="https://i.ibb.co/QXVvvcS/photo-2023-05-22-21-00-29.jpg"
                                name="Harmeet Singh"
                                username="harmeet9013"
                                date="18th August 2023"
                                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                media="https://cdn.hashnode.com/res/hashnode/image/upload/v1672929854812/b97fef7e-400f-4f2a-ae90-34b19078ed46.png"
                            />
                            <Divider flexItem />
                            <Tweet
                                avatar="https://i.ibb.co/QXVvvcS/photo-2023-05-22-21-00-29.jpg"
                                name="Harmeet Singh"
                                username="harmeet9013"
                                date="18th August 2023"
                                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                media="https://cdn.hashnode.com/res/hashnode/image/upload/v1672929854812/b97fef7e-400f-4f2a-ae90-34b19078ed46.png"
                            />
                            <Divider flexItem />
                        </Stack>
                    </Slide>
                </TransitionGroup>
            )}
        </Fragment>
    );
}
