import { Container, Stack, Typography } from "@mui/material";

export default function Header(props) {
    return (
        <Stack
            direction="column"
            spacing={2}
            component={Container}
            justifyContent="flex-start"
            alignItems="flex-start"
            paddingTop={2}
            paddingBottom={6}
            sx={{
                backgroundColor: (theme) => theme.palette.background.header,
                position: "fixed",
                backdropFilter: "blur(10px)",
                width: "inherit",
                zIndex: "50",
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
        >
            <Typography variant="h6" fontWeight="bold">
                {props.pageName}
            </Typography>
        </Stack>
    );
}
