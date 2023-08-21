import {
    Cancel,
    CheckCircle,
    Email,
    Face,
    Face2Rounded,
    FaceRounded,
    PasswordRounded,
    Person,
    Person2Rounded,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import {
    Button,
    Divider,
    Fade,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { TransitionGroup } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useConfirm } from "material-ui-confirm";

export default function AuthPage(props) {
    const navigate = useNavigate();
    const confirmDialog = useConfirm();

    const [isLogin, setIsLogin] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [usernameResponse, setUsernameResponse] = useState({
        icon: <Person2Rounded />,
        message: "",
    });
    let timeoutId;

    const handleLogin = async (e) => {
        e.preventDefault();
        const emailUsername = e.target.email.value;
        const password = e.target.password.value;

        const loginData = {
            emailUsername,
            password,
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/users/login`,
                loginData
            );

            // setup cookies with token and userid
            Cookies.set("token", response.data.token, {
                expires: 1 / 24,
                secure: true,
            });
            Cookies.set("userID", response.data.userID, {
                expires: 1 / 24,
                secure: true,
            });

            // setup usestate with proper details
            props.setLoggedUser({
                logged: true,
                username: response.data.username,
                name: response.data.name,
                avatar: response.data.avatar,
            });

            // go to home page
            navigate("/");
        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                props.setOfflineServerDialog(true);
            }
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const username = e.target.username.value;
        const password = e.target.password.value;

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/users/signup`,
                {
                    userData: {
                        name,
                        email,
                        username,
                        password,
                    },
                }
            );

            // setup cookies with token and userid
            Cookies.set("token", response.data.token, {
                expires: 1 / 24,
                secure: true,
            });
            Cookies.set("userID", response.data.userID, {
                expires: 1 / 24,
                secure: true,
            });

            // update the loggeduser state
            props.setLoggedUser({
                logged: true,
                username: response.data.username,
                name: response.data.name,
                avatar: response.data.avatar,
            });

            // send the confirmation dialog
            confirmDialog({
                title: "User Created!",
                description:
                    "Do you want to go to your profile to set up bio and profile image?",
            })
                .then(() => {
                    navigate("/profile");
                })
                .catch(() => {
                    navigate("/explore");
                });
        } catch (error) {
            // server offline error
            if (error.code === "ERR_NETWORK") {
                props.setOfflineServerDialog(true);
            } else {
                // error dialog
                confirmDialog({
                    title: "Error",
                    description: error.response.data.message,
                    hideCancelButton: true,
                });
            }
        }
    };

    const handleUsernameChange = (event) => {
        const username = event.target.value;

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            if (username.length > 4 && username.length < 24) {
                checkUsernameRequest(username);
            } else {
                setUsernameResponse({
                    icon: <Person2Rounded />,
                    message: "",
                });
            }
        }, 500);
    };

    const checkUsernameRequest = async (username) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/users/checkusername`,
                {
                    username,
                }
            );
            setUsernameResponse({
                icon: <CheckCircle color="success" />,
                message: response.data.message,
            });
        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                props.setOfflineServerDialog(true);
            } else {
                setUsernameResponse({
                    icon: <Cancel color="error" />,
                    message: "This username is not available!",
                });
            }
        }
    };

    useEffect(() => {
        if (isAnimating) {
            setTimeout(() => {
                setIsAnimating(false);
            }, 200);
        }
    }, [isAnimating]);

    return (
        <Stack
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <TransitionGroup component={null}>
                <Fade>
                    <Paper
                        elevation={1}
                        component={Stack}
                        spacing={2}
                        padding={4}
                        sx={{
                            borderRadius: "15px",
                            width: "70%",
                            mt: "25vh",
                            transition: (theme) => theme.transitions.create(),
                        }}
                    >
                        <Fade in={!isAnimating}>
                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                sx={{
                                    cursor: "default",
                                }}
                            >
                                {isLogin ? "Login" : "Sign up"}
                            </Typography>
                        </Fade>

                        <Divider flexItem />

                        <Fade in={!isAnimating}>
                            <Stack
                                spacing={2}
                                component="form"
                                onSubmit={isLogin ? handleLogin : handleSignup}
                                justifyContent="center"
                                alignItems="center"
                            >
                                {!isLogin && (
                                    <Fragment>
                                        <TextField
                                            fullWidth
                                            required
                                            type="text"
                                            id="name"
                                            color="secondary"
                                            variant="outlined"
                                            placeholder="Full Name"
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "15px",
                                                    "&.Mui-focused": {
                                                        backgroundColor: (
                                                            theme
                                                        ) =>
                                                            theme.palette.action
                                                                .hover,
                                                    },
                                                    transition: (theme) =>
                                                        theme.transitions.create(),
                                                },
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Face />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            required
                                            type="text"
                                            id="username"
                                            color="secondary"
                                            variant="outlined"
                                            placeholder="Username"
                                            helperText={
                                                usernameResponse.message
                                            }
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "15px",
                                                    "&.Mui-focused": {
                                                        backgroundColor: (
                                                            theme
                                                        ) =>
                                                            theme.palette.action
                                                                .hover,
                                                    },
                                                    transition: (theme) =>
                                                        theme.transitions.create(),
                                                },
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        {usernameResponse.icon}
                                                    </InputAdornment>
                                                ),
                                            }}
                                            onChange={handleUsernameChange}
                                        />
                                    </Fragment>
                                )}
                                <TextField
                                    fullWidth
                                    required
                                    type="text"
                                    id="email"
                                    color="secondary"
                                    variant="outlined"
                                    placeholder={
                                        isLogin
                                            ? "Email Address or Username"
                                            : "Email Address"
                                    }
                                    InputProps={{
                                        sx: {
                                            borderRadius: "15px",
                                            "&.Mui-focused": {
                                                backgroundColor: (theme) =>
                                                    theme.palette.action.hover,
                                            },
                                            transition: (theme) =>
                                                theme.transitions.create(),
                                        },
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    required
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    color={
                                        showPassword ? "warning" : "secondary"
                                    }
                                    variant="outlined"
                                    placeholder="Password"
                                    InputProps={{
                                        sx: {
                                            borderRadius: "15px",
                                            "&.Mui-focused": {
                                                backgroundColor: (theme) =>
                                                    theme.palette.action.hover,
                                                outlineColor: (theme) =>
                                                    theme.palette.action
                                                        .disabled,
                                            },
                                            transition: (theme) =>
                                                theme.transitions.create(),
                                        },
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PasswordRounded />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => {
                                                        setShowPassword(
                                                            !showPassword
                                                        );
                                                    }}
                                                >
                                                    {showPassword ? (
                                                        <Visibility color="warning" />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button
                                    type="submit"
                                    color="secondary"
                                    sx={{
                                        padding: "10px 40px",
                                        borderRadius: "15px",
                                    }}
                                >
                                    <Typography variant="h6">
                                        {isLogin ? "Login" : "Sign up"}
                                    </Typography>
                                </Button>
                            </Stack>
                        </Fade>

                        <Button
                            type="text"
                            color="neutral"
                            sx={{
                                "&:hover": {
                                    backgroundColor: "transparent",
                                },
                            }}
                            onClick={() => {
                                setTimeout(() => {
                                    setIsLogin(!isLogin);
                                }, 200);
                                setIsAnimating(true);
                            }}
                        >
                            {isLogin ? "New user?" : "Existing user?"}
                        </Button>
                    </Paper>
                </Fade>
            </TransitionGroup>
        </Stack>
    );
}
