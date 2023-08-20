import {
    Box,
    CssBaseline,
    Divider,
    Stack,
    ThemeProvider,
    createTheme,
    useMediaQuery,
} from "@mui/material";
import { blue, grey, red } from "@mui/material/colors";
import { ConfirmProvider } from "material-ui-confirm";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import DiscoverPanel from "./components/shared/DiscoverPanel/DiscoverPanel";
import FollowingPage from "./components/pages/FollowingPage/FollowingPage";
import ExplorePage from "./components/pages/ExplorePage/ExplorePage";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import Functions from "./components/shared/Functions/Functions";
import AuthPage from "./components/pages/AuthPage/AuthPage";

export default function App() {
    const [darkMode, setDarkMode] = useState(null);
    const [showLoading, setShowLoading] = useState(true);
    const [openOfflineServerDialog, setOfflineServerDialog] = useState(false);
    const [loggedUser, setLoggedUser] = useState({
        logged: false,
        name: "",
        avatar: "",
    });

    const systemTheme = useMediaQuery("(prefers-color-scheme: dark)")
        ? true
        : false;

    useEffect(() => {
        const cookiesTheme = Cookies.get("theme");

        if (cookiesTheme === "dark") {
            setDarkMode(true);
        } else if (cookiesTheme === "light") {
            setDarkMode(false);
        } else {
            setDarkMode(systemTheme);
        }
    }, [systemTheme]);

    useEffect(() => {
        setTimeout(() => {
            setShowLoading(false);
        }, 500);
    }, [showLoading]);

    const checkServer = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_API_URL}`);
        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                setOfflineServerDialog(true);
            }
        }
    };

    const verifyToken = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/users/tokenverify`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userID: userID,
                        "Content-Type": "application/json",
                    },
                }
            );
            setLoggedUser({
                logged: true,
                name: response.data.name,
                avatar: response.data.avatar,
            });
        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                setOfflineServerDialog(true);
            } else {
                Cookies.remove("sessionToken");
                Cookies.remove("sessionUserID");
            }
            setLoggedUser({
                logged: false,
                name: "",
                avatar: "",
            });
        }
    };

    useEffect(() => {
        const token = Cookies.get("sessionToken");
        const userID = Cookies.get("sessionUserID");

        console.log(token);

        if (token && userID) {
            verifyToken();
        } else {
            checkServer();
        }
    }, [loggedUser]);

    const CssBaselineStyles = {
        typography: {
            fontFamily: "work sans",
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    "html *": {
                        fontFamily: "work sans",
                        "&:link": {
                            color: darkMode
                                ? "rgba(50, 255, 255, 1)"
                                : "rgba(50, 120, 120, 1)",
                        },
                    },
                    body: {
                        textAlign: "center",
                        justfifyContent: "center",
                        alignItems: "center",
                        transition: "all 0.25s ease",
                    },
                },
            },
        },
    };

    const myTheme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
            primary: blue,
            secondary: red,

            ...(darkMode
                ? {
                      background: {
                          default: "#121212",
                          header: "#121212ef",
                      },
                      neutral: {
                          main: grey[200],
                      },
                  }
                : {
                      background: {
                          header: "rgba(255, 255, 255, 0.85)",
                      },
                      neutral: {
                          main: grey[700],
                      },
                  }),
        },
        ...CssBaselineStyles,
    });

    return (
        <ThemeProvider theme={myTheme}>
            <ConfirmProvider
                defaultOptions={{
                    confirmationButtonProps: { autoFocus: true },
                    dialogProps: {
                        elevation: 0,
                        maxWidth: "xs",
                        PaperProps: {
                            elevation: 1,
                            sx: {
                                justfifyContent: "center",
                                alignItems: "center",
                                borderRadius: "15px",
                            },
                        },
                    },
                    confirmationButtonProps: {
                        color: "primary",
                        sx: {
                            borderRadius: "15px",
                        },
                    },
                    cancellationButtonProps: {
                        color: "secondary",
                        sx: {
                            borderRadius: "15px",
                        },
                    },
                }}
            >
                <CssBaseline enableColorScheme />

                <Stack
                    direction="row"
                    spacing={0}
                    justifyContent="center"
                    alignItems="flex-start"
                >
                    <DiscoverPanel
                        setShowLoading={setShowLoading}
                        loggedUser={loggedUser}
                        openOfflineServerDialog={openOfflineServerDialog}
                        setLoggedUser={setLoggedUser}
                        setOfflineServerDialog={setOfflineServerDialog}
                    />

                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            borderRightWidth: 1,
                            height: "100vh",
                            ml: "30px",
                        }}
                    />

                    <Box
                        direction="column"
                        spacing={2}
                        sx={{
                            overflowY: "auto",
                            maxHeight: "100vh",
                            width: "40rem",
                            position: "relative",
                            backgroundColor: "transparent",
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                        }}
                    >
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <FollowingPage
                                        loggedUser={loggedUser}
                                        showLoading={showLoading}
                                    />
                                }
                            />
                            <Route
                                path="/explore"
                                element={
                                    <ExplorePage
                                        setShowLoading={setShowLoading}
                                    />
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <ProfilePage
                                        setShowLoading={setShowLoading}
                                    />
                                }
                            />
                            <Route
                                path="/authpage"
                                element={
                                    <AuthPage
                                        setOfflineServerDialog={
                                            setOfflineServerDialog
                                        }
                                        setShowLoading={setShowLoading}
                                        setLoggedUser={setLoggedUser}
                                    />
                                }
                            />
                        </Routes>
                    </Box>

                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            borderRightWidth: 1,
                            height: "100vh",
                            mr: "30px",
                        }}
                    />

                    <Functions />
                </Stack>
            </ConfirmProvider>
        </ThemeProvider>
    );
}
