import { TrendingUp } from "@mui/icons-material";
import {
    Button,
    Divider,
    Paper,
    Stack,
    Typography,
    styled,
} from "@mui/material";

export default function Functions(props) {
    const HashtagButton = styled(Button)(({ theme }) => ({
        textTransform: "none",
        borderRadius: "15px",
        color: theme.palette.primary.main,
        "&:hover": {
            backgroundColor: theme.palette.action.hover,
        },
    }));

    return (
        <Stack direction="column" paddingTop="30px">
            <Stack
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={1}
                component={Paper}
                elevation={1}
                sx={{
                    borderRadius: "15px",
                    padding: "10px 20px",
                    width: "100%",
                }}
            >
                <Typography variant="h6">What's happening</Typography>
                <Divider flexItem variant="middle" />
                <HashtagButton disableRipple>
                    # some random hashtag
                </HashtagButton>
                <HashtagButton disableRipple>
                    # some random hashtag
                </HashtagButton>
                <HashtagButton disableRipple>
                    # some random hashtag
                </HashtagButton>
            </Stack>
        </Stack>
    );
}
