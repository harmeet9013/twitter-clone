import {
    ExpandMore,
    Explore,
    ExploreOutlined,
    Favorite,
    FavoriteBorder,
    Login,
    Logout,
    Person,
    PersonOutline,
    Twitter,
} from "@mui/icons-material";
import {
    Accordion,
    AccordionActions,
    AccordionSummary,
    Avatar,
    Box,
    Button,
    Divider,
    Grow,
    Stack,
    Typography,
    styled,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import Cookies from "js-cookie";
import { useConfirm } from "material-ui-confirm";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function DiscoverPanel(props) {
    const navigate = useNavigate();
    const confirmDialog = useConfirm();

    const [openMenu, setOpenMenu] = useState(false);

    const MyNavLink = styled(Button)(({ theme }) => ({
        textDecoration: "none",
        textTransform: "none",
        fontSize: "1.4rem",
        width: "100%",
        padding: "8px 20px",
        borderRadius: "15px",
        justifyContent: "flex-start",
        alignItems: "center",
        color: theme.palette.text.primary,
        transition: theme.transitions.create(),
        "&:hover": {
            backgroundColor: theme.palette.action.hover,
        },
    }));

    const UserButton = styled(Button)(({ theme }) => ({
        textTransform: "none",
        fontSize: "1.2rem",
        gap: 5,
        minWidth: "14rem",
        padding: "8px 20px",
        borderRadius: "30px",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        backgroundColor: blue[700],
        transition: theme.transitions.create(),
        "&:hover": {
            backgroundColor: blue[800],
        },
    }));

    const serverOfflineDialog = () => {
        confirmDialog({
            title: "Server Offline",
            description: "Most services of this website won't work.",
            hideCancelButton: true,
        }).then(() => {
            props.setOfflineServerDialog(false);
        });
    };

    const TabButton = ({ to, activeContent, inactiveContent, name }) => {
        const [isActive, setIsActive] = useState(false);

        return (
            <MyNavLink
                disableRipple
                component={NavLink}
                to={to}
                onClick={() => {
                    props.setShowLoading(true);
                }}
                style={({ isActive, isPending }) => {
                    setIsActive(isActive);
                    return {
                        fontWeight: isActive ? "bold" : "normal",
                    };
                }}
                startIcon={isActive ? activeContent : inactiveContent}
            >
                {name}
            </MyNavLink>
        );
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpenMenu(false);
        }, 5000);
        return () => {
            clearTimeout(timer);
        };
    }, [openMenu]);

    useEffect(() => {
        if (props.openOfflineServerDialog) {
            serverOfflineDialog();
        }
    }, [props.openOfflineServerDialog]);

    return (
        <Stack
            direction="column"
            spacing={1}
            paddingTop={4}
            paddingBottom={4}
            height="100vh"
            justifyContent="space-between"
        >
            <Stack spacing={2}>
                <Typography
                    variant="h5"
                    color="primary"
                    sx={{
                        cursor: "default",
                        fontWeight: "medium",
                    }}
                >
                    <Twitter
                        fontSize="large"
                        sx={{
                            my: "-10px",
                        }}
                    />{" "}
                    Twitter Clone
                </Typography>
                <Divider
                    flexItem
                    sx={{
                        borderBottomWidth: 2,
                    }}
                />
                <TabButton
                    to="/"
                    name="Following"
                    activeContent={<Favorite color="primary" />}
                    inactiveContent={<FavoriteBorder />}
                />
                <TabButton
                    to="/explore"
                    name="Explore"
                    activeContent={<Explore color="primary" />}
                    inactiveContent={<ExploreOutlined />}
                />
                <TabButton
                    to={props.loggedUser.logged ? "/profile" : "/authpage"}
                    name="Profile"
                    activeContent={<Person color="primary" />}
                    inactiveContent={<PersonOutline />}
                />
            </Stack>

            {props.loggedUser.logged ? (
                <Accordion
                    elevation={0}
                    expanded={openMenu}
                    onClick={() => {
                        setOpenMenu(!openMenu);
                    }}
                    sx={{
                        transform: "rotate(180deg)",

                        transition: (theme) => theme.transitions.create(),
                        "&:not(:last-child)": {
                            borderBottom: 0,
                        },
                        "&:before": {
                            display: "none",
                        },
                    }}
                >
                    <AccordionSummary
                        expandIcon={
                            <ExpandMore
                                sx={{
                                    transform: "rotate(180deg)",
                                }}
                            />
                        }
                        sx={{
                            transform: "rotate(180deg)",
                        }}
                    >
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            gap={2}
                        >
                            <Avatar src={props.loggedUser.avatar} />
                            <Typography>{props.loggedUser.name}</Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionActions
                        sx={{
                            transform: "rotate(180deg)",
                        }}
                    >
                        <UserButton
                            onClick={() => {
                                props.setLoggedUser({
                                    logged: false,
                                    name: "",
                                    avatar: "",
                                });
                                Cookies.remove("sessionToken");
                                Cookies.remove("sessionUserID");
                            }}
                            startIcon={<Logout />}
                        >
                            Logout
                        </UserButton>
                    </AccordionActions>
                </Accordion>
            ) : (
                <Grow in={true}>
                    <UserButton
                        endIcon={<Login />}
                        onClick={() => {
                            navigate("/authpage");
                        }}
                    >
                        Sign in
                    </UserButton>
                </Grow>
            )}
        </Stack>
    );
}
